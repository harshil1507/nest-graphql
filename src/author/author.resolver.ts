import { Resolver, Args, Int, ResolveField, Parent, Query, Mutation, Subscription } from "@nestjs/graphql";
import {Author} from './models/author.model'
import { Post } from "./models/post.model";
import { NewAuthor } from "./dto/author.input";
import { PubSub } from "graphql-subscriptions";
import {PostService} from './post.service'
import {AuthorService} from './author.service'
const pubSub = new PubSub()

@Resolver(of => Author)
export class AuthorResolver{
    constructor(
        private authorService : AuthorService,
        private postService : PostService,
    ){}

    @Query(returns => Author, {name: 'author'})
    async getAuthor(
        @Args('id', {type: ()=> Int}) id: number,
    ){
        return this.authorService.findOneById(id);
    }

    @Query(returns=>[Post], {name: 'posts'})
    async getAllPosts(){
        return this.postService.showAllPosts();
    }

    @ResolveField('posts', returns => [Post])
    async getPosts(
        @Parent() author: Author,
    ){
            const {id} = author;
            return this.postService.findAll({authorId: id});
    }

    @Mutation(returns=> Post)
    async AddPost(
        @Args({name: 'id', type:()=>Int}) id : number,
        @Args({name: 'title'}) title : string,
        @Args({name: 'votes', type:()=>Int}) votes : number,
        //@Args({name: 'author', type:()=>NewAuthor}) author : Author,

    ){
        return this.postService.insertPost(id, title,votes)
    }

    @Mutation(returns => Post)
    async upvotePost(
        @Args({name :'id', type: ()=>Int}) id:number,
    ){
        return this.postService.upvoteById(id)
    }
    
    // @Subscription(returns => Comment)
    // commentAdded(){
    //     return pubSub.asyncIterator('comment added')
    // }

    // @Mutation(returns => Post)
    // async addComment(
    // @Args('postId', { type: () => Int }) postId: number,
    // @Args('comment', { type: () => Comment }) comment: CommentInput,
    // ) {
    // const newComment = this.commentsService.addComment({ id: postId, comment });
    // pubSub.publish('commentAdded', { commentAdded: newComment });
    // return newComment;
    // }
}