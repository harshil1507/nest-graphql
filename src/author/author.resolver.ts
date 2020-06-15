import { Resolver, Args, Int, ResolveField, Parent, Query, Mutation, Subscription } from "@nestjs/graphql";
import {Author} from './models/author.model';
import { Post } from "./models/post.model";
import {PostService} from './post.service'
import {AuthorService} from './author.service'
@Resolver(of => Author)
export class AuthorResolver{
    constructor(
        private authorService : AuthorService,
        private postService : PostService,
    ){}


//--------Queries-----------
@Query(returns => [Post])
async FetchAllPosts(
    @Args({name: 'authorId', type:()=>Int}) authorId : number,
    @Args('cursor')cursor : string,
    @Args('limit', {type: ()=>Int})limit : number,
    @Args('reverse',{type: ()=> Boolean, nullable: true}) reverse : boolean
){
    return this.authorService.fetchAllPosts(authorId);
}



@Query(returns=>[Author])
async FetchAllAuthors(
    @Args('cursor')cursor : string,
    @Args('limit', {type: ()=>Int, nullable: true})limit : number,
    @Args('reverse',{type: ()=> Boolean, nullable: true}) reverse : boolean

){
    return this.authorService.fetchAllAuthors(cursor,limit,reverse);
}

//--------Mutations-----------

    @Mutation(returns=> [Post])
    async AddPost(
        @Args({name: 'authorId', type:()=>Int}) authorId : number,
        @Args({name: 'id', type:()=>Int}) id : number,
        @Args({name: 'title'}) title : string,
        @Args({name: 'votes', type:()=>Int, nullable:true}) votes ?: number,
        @Args({name:'date', type:()=> Date, nullable:true}) date ?: Date,
    ){
        return this.authorService.addPost({authorId,id, title})
    }

    @Mutation(returns => Post)
    async UpdatePost(
        @Args({name: 'authorId', type:()=>Int}) authorId : number,
        @Args({name: 'id', type:()=>Int}) id : number,
        @Args({name: 'title'}) title : string,
    ){
        return this.authorService.updatePost({authorId,id,title})
    }

    @Mutation(returns => Post)
    async UpVote(
        @Args({name: 'authorId', type:()=>Int}) authorId : number,
        @Args({name: 'id', type:()=>Int}) id : number,
    ){
        return this.authorService.upVote(authorId,id);
    }
    
    @Mutation(returns => Author)
    async DeletePost(
        @Args({name: 'authorId', type:()=>Int}) authorId : number,
        @Args({name: 'id', type:()=>Int}) id : number,
    ){
        return this.authorService.deletePost(authorId,id);
    }

    @Mutation(returns=>Author)
    async AddAuthor(
        @Args({name: 'id', type:()=>Int}) id : number,
        @Args('firstName') firstName:string,
        @Args('lastName', {nullable:true}) lastName?:string,
        //@Args('posts',{ type:()=> Post, nullable:true, defaultValue:[]}) posts?:Post
    ){
        return this.authorService.create({id,firstName,lastName});
    }

    @Mutation(returns => Boolean)
    async DeleteAuthor(
        @Args({name: 'id', type: ()=> Int}) authorId : number
    ){
        return this.authorService.deleteAuthor(authorId)
    }

    @Mutation(returns=>Author)
    async UpdateAuthor(
        @Args({name: 'id', type:()=>Int}) id : number,
        @Args('firstName',{nullable : true}) firstName?:string,
        @Args('lastName', {nullable:true}) lastName?:string,
        //@Args('posts',{ type:()=> Post, nullable:true, defaultValue:[]}) posts?:Post
    ){
        return this.authorService.updateAuthor(id,firstName,lastName);
    }
    

}