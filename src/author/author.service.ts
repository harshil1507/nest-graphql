import { Injectable,ConflictException, NotFoundException } from '@nestjs/common';
import {Author} from './models/author.model'
import {Post} from './models/post.model';
import { InjectModel } from '@nestjs/mongoose';
import { AuthorDB,PostDB } from "./schemas/author.schema";
import { Model } from 'mongoose';
import { CreateAuthorDto } from "./dto/create-author.dto";
import { CreatePostDto } from './dto/create-post.dto';
@Injectable()
export class AuthorService{

    constructor(
        @InjectModel(AuthorDB.name)protected authorModel?: Model<AuthorDB>,
        @InjectModel(PostDB.name)protected postModel?: Model<PostDB>,
        ){}
    
    async addPost(createPostDto : CreatePostDto): Promise<PostDB[]>{
        // let newAuthor = new this.authorModel(CreateAuthorDto);
        let newAuthor = await this.authorModel.findOne({id : createPostDto.authorId}).exec()
        let newPost = new this.postModel(createPostDto);
        // console.log(newAuthor,'-',newPost);
        newPost.id = createPostDto.id;
        newPost.title = createPostDto.title;
        newPost.votes = 0;
        newPost.date = new Date() 
        newAuthor.posts.push(newPost);
        newAuthor.save()
        return newAuthor.posts
            
    }

    async fetchAllPosts(authorId): Promise<PostDB[]>{
        let allPosts = await this.authorModel.findOne({id : authorId}).exec()
        return allPosts.posts
    }

    async upVote(authorId: number,id: number): Promise<PostDB>{
        let newAuthor = await this.authorModel.findOne({id : authorId}).exec()
        let i: number;
        newAuthor.posts.find((obj,index)=>{
            if(obj.id === id){
                newAuthor.posts[index].votes = newAuthor.posts[index].votes+1; 
                console.log(newAuthor)
                i = index;
                return 
            }
            else
            throw new NotFoundException
        })
        await newAuthor.save()
        return newAuthor.posts[i];
    }

    async updatePost(createPostDto : CreatePostDto) : Promise<PostDB> {
        let newAuthor = await this.authorModel.findOne({id : createPostDto.authorId}).exec()
        let i: number;
        newAuthor.posts.find((obj,index)=>{
            if(obj.id === createPostDto.id){
                i = index;
                newAuthor.posts[index].title = createPostDto.title;
                newAuthor.posts[index].date = new Date();
                return 
            }
        })
        newAuthor.save()
        return newAuthor.posts[i];
    }

    async deletePost(authorId : number,id : number){
        let newAuthor = await this.authorModel.findOne({id : authorId}).exec()
        newAuthor.posts.find((obj,index)=>{
            if(obj.id === id){
                newAuthor.posts.splice(index,1) 
                return 
            }
        })
        
        return newAuthor.save()
    }


    async checkAuthorPresent(id?: number){
        if(id)  return this.authorModel.find({id: id}).exec();
        return this.authorModel.find().exec();
    }

    async create(createAuthorDto : CreateAuthorDto): Promise<AuthorDB>{
        const createdAuthor = new this.authorModel(createAuthorDto);
        if((await this.checkAuthorPresent(createdAuthor.id)).length !== 0)
            throw new ConflictException;
        else    return createdAuthor.save();
    }

    async deleteAuthor(id: number): Promise<Boolean>{
        console.log(id)
        let a = await this.authorModel.deleteOne({id:id}).exec()
        if(a.n === 1 )
            return true
        return false
    }

    async updateAuthor(id: number, firstName?: string, lastName?: string){
        let newAuthor = await this.authorModel.findOne({id:id}).exec()
        if(firstName) newAuthor.firstName = firstName;
        if(lastName) newAuthor.lastName = lastName;
        return newAuthor.save();
    }

    async fetchAllAuthors(cursor:string, limit: number, reverse?: boolean) : Promise<AuthorDB[]>{
        if(reverse === true) return this.authorModel.find({_id : {$lt : cursor}}).limit(limit).exec()
        return this.authorModel.find({_id : {$gt : cursor}}).limit(limit).exec()
    }

    //--------------------------------------OLD GRAPHQL QUERIES---------------------------------------------------//


}