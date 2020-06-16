import { Resolver, Args, Int, ResolveField, Parent, Query, Mutation, Subscription } from "@nestjs/graphql";
import {Author} from './models/author.model';
import { Post } from "./models/post.model";
import {PostService} from './post.service'
import {AuthorService} from './author.service'
import { ObjectIdScalar } from "./scalars/mongo-object.scalar";
@Resolver(of => Author)
export class AuthorResolver{
    constructor(
        private authorService : AuthorService,
        private postService : PostService,
    ){}


//--------Queries-----------
@Query(returns => [Post])
async FetchAllPosts(
    @Args({name: 'authorId'}) authorId : string,
    @Args('cursor', {nullable: true})cursor ?: string,
    @Args('limit', {type: ()=>Int, nullable: true})limit ?: number,
    @Args('reverse',{type: ()=> Boolean, nullable: true}) reverse ?: boolean
){
    return this.postService.fetchAllPosts(authorId,cursor,limit,reverse);
}



@Query(returns=>[Author])
async FetchAllAuthors(
    @Args('cursor', {nullable: true})cursor : string,
    @Args('limit', {type: ()=>Int, nullable: true})limit : number,
    @Args('reverse',{type: ()=> Boolean, nullable: true}) reverse : boolean

){
    return this.authorService.fetchAllAuthors(cursor,limit,reverse);
}

//--------Mutations-----------

    @Mutation(returns=> [Post])
    async AddPost(
        @Args({name: 'authorId'}) authorId : string,
        @Args({name: 'title'}) title : string,
        @Args({name: 'votes', type:()=>Int, nullable:true}) votes ?: number,
        @Args({name:'date', type:()=> Date, nullable:true}) date ?: Date,
    ){
        return this.postService.addPost({authorId,title})
    }

    @Mutation(returns => Post)
    async UpdatePost(
        @Args({name: 'authorId'}) authorId : string,
        @Args({name: 'id'}) _id : string,
        @Args({name: 'title'}) title : string,
    ){
        return this.postService.updatePost({authorId,_id,title})
    }

    @Mutation(returns => Post)
    async UpVote(
        @Args({name: 'authorId'}) authorId : string,
        @Args({name: 'id'}) id : string,
    ){
        return this.postService.upVote(authorId,id);
    }
    
    @Mutation(returns => Author)
    async DeletePost(
        @Args({name: 'authorId'}) authorId : string,
        @Args({name: 'id'}) id : string,
    ){
        return this.postService.deletePost(authorId,id);
    }

    @Mutation(returns=>Author)
    async AddAuthor(
        @Args('firstName') firstName:string,
        @Args('lastName', {nullable:true}) lastName?:string,
        //@Args('posts',{ type:()=> Post, nullable:true, defaultValue:[]}) posts?:Post
    ){
        return this.authorService.create({firstName,lastName});
    }

    @Mutation(returns => Boolean)
    async DeleteAuthor(
        @Args({name: 'id'}) authorId : string
    ){
        return this.authorService.deleteAuthor(authorId)
    }

    @Mutation(returns=>Author)
    async UpdateAuthor(
        @Args({name: 'id'}) id : string,
        @Args('firstName',{nullable : true}) firstName?:string,
        @Args('lastName', {nullable:true}) lastName?:string,
        //@Args('posts',{ type:()=> Post, nullable:true, defaultValue:[]}) posts?:Post
    ){
        return this.authorService.updateAuthor(id,firstName,lastName);
    }
    

}