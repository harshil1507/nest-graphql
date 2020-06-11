import { Resolver, Args, Int, ResolveField, Parent, Query, Mutation, Subscription } from "@nestjs/graphql";
import {Author} from './models/author.model';
import {PaginatedAuthor} from './models/paginated-author.model';
import { Post } from "./models/post.model";
import {PostService} from './post.service'
import {AuthorService} from './author.service'
@Resolver(of => Author)
export class AuthorResolver{
    constructor(
        private authorService : AuthorService,
        private postService : PostService,
    ){}

    // @Query(returns=>PaginatedAuthor, {name:'pagedAuthor'})
    // async getPagedAuthor(
    //     @Args('first', {type: ()=> Int}) cursor: number,
    // ){
    //     return this.authorService.pagedAuthor(cursor)
    // }
    @Query(returns=>[Author],{
        name: 'autoPage',
        description:'will automatically start from the first element that was inserted and with a default limit of 2. both the starting point and limit cna be passed as args'
    })
    async autoPage(
        @Args({name :'cursor', type: ()=>Int, nullable:true}) cursor?: number,
        @Args({name :'limit', type: ()=>Int, nullable:true}) limitQuery?: number
    ){
        return this.authorService.autoPage(cursor,limitQuery);
    }

    @Query(returns => Author, {name: 'author'})
    async getSingleAuthor(
        @Args('id', {type: ()=> Int}) id: number,
    ){
        return this.authorService.findAuthor(id);
    }

    @Query(returns => [Author])
    async getAllAuthors(){
        return this.authorService.findAll();
    }

    @Query(returns=>[Post], {name: 'posts'})
    async getAllPosts(){
        return this.postService.showAllPosts();
    }

    @Query(returns=>[Author],{name: 'getAuthors'})
    async getPage(
        @Args({name :'cursor', type: ()=>Int, nullable:true}) cursor?: number,
        @Args({name :'limit', type: ()=>Int, nullable:true}) limitQuery?: number
    ){
        return this.authorService.pagination(cursor,limitQuery);
    }

    // @ResolveField('posts', returns => [Post])
    // async getPosts(
    //     @Parent() author: Author,
    // ){
    //         const {id} = author;
    //         return this.postService.findAll({authorId: id});
    // }

    @Mutation(returns=>Author)
    async addAuthor(
        @Args({name: 'id', type:()=>Int}) id : number,
        @Args('firstName') firstName:string,
        @Args('lastName', {nullable:true}) lastName?:string,
        //@Args('posts',{ type:()=> Post, nullable:true, defaultValue:[]}) posts?:Post
    ){
        return this.authorService.addAuthor(id,firstName,lastName,);
    }

    @Mutation(returns => Post)
    async upvotePost(
        @Args({name :'id', type: ()=>Int}) id:number,
       
    ){
        return this.postService.upvoteById(id)
    }

    @Mutation(returns=> Post)
    async AddPost(
        @Args({name: 'id', type:()=>Int}) id : number,
        @Args({name: 'title'}) title : string,
        @Args({name: 'votes', type:()=>Int}) votes : number,
        @Args({name:'date', type:()=> Date}) date : Date,
    ){
        return this.postService.insertPost(id, title,votes,date)
    }

}