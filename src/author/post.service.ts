import { Injectable,ConflictException, NotFoundException } from '@nestjs/common';
import {Author} from './models/author.model'
import {Post} from './models/post.model';
import {AuthorService} from './author.service'
import {UpvotePostInput} from './dto/upvote.input';
import { DateScalar } from './scalars/custom-scalar.scalar-type';
import { InjectModel } from '@nestjs/mongoose';
import { PostDB, AuthorDB } from './schemas/author.schema';
import { Model } from 'mongoose';
import { CreatePostDto } from "./dto/create-post.dto";
import { CreateAuthorDto } from './dto/create-author.dto';
import { ObjectIdScalar } from "./scalars/mongo-object.scalar";
import { reverse } from 'dns';
const mongoose = require('mongoose')
@Injectable()
export class PostService{
    
    constructor(
        @InjectModel(PostDB.name) private postModel : Model<PostDB>,
        @InjectModel(AuthorDB.name)protected authorModel?: Model<AuthorDB>,
        ){}

    async addPost(createPostDto : CreatePostDto): Promise<PostDB[]>{
        // let newAuthor = new this.authorModel(CreateAuthorDto);
        let newAuthor = await this.authorModel.findOne({_id : createPostDto.authorId}).exec()
        let newPost = new this.postModel(createPostDto);
        // console.log(newAuthor,'-',newPost);
        newPost._id = new mongoose.Types.ObjectId();
        newPost.title = createPostDto.title;
        newPost.votes = 0;
        newPost.date = new Date() 
        newAuthor.posts.push(newPost);
        newAuthor.save()
        return newAuthor.posts
            
    }

    async fetchAllPosts(authorId : ObjectIdScalar,cursor : ObjectIdScalar, limit: number,reverse:boolean): Promise<PostDB[]>{
        let allPosts = await this.authorModel.findOne({_id : authorId}).exec()
        let result
        let index :number;
        if(cursor){
            result = allPosts.posts.filter((obj)=>JSON.stringify(obj._id) >= JSON.stringify(cursor));
            if(reverse===true) result = allPosts.posts.filter((obj)=>JSON.stringify(obj._id) <= JSON.stringify(cursor));
            if(limit){
                result = result.slice(0,limit)
            }
            return result
        }
        if(limit){
            result = allPosts.posts
            result = result.slice(0,limit)
        }
        return allPosts.posts
    }

    async upVote(authorId: ObjectIdScalar,id: ObjectIdScalar): Promise<PostDB>{
        let newAuthor = await this.authorModel.findOne({_id : authorId}).exec()
        let i: number;
        //console.log(newAuthor);
        
        newAuthor.posts.find((obj,index)=>{
            //console.log(obj);
            
            if(JSON.stringify(obj._id) === JSON.stringify(id)){
                i = index;
                newAuthor.posts[index].votes = newAuthor.posts[index].votes+1; 
                console.log(newAuthor)
                return
            }
        })
        await newAuthor.save()
        console.log('---------------------',newAuthor)
        return newAuthor.posts[i];
    }

    async updatePost(createPostDto : CreatePostDto) : Promise<PostDB> {
        let newAuthor = await this.authorModel.findOne({_id : createPostDto.authorId}).exec()
        let i: number;
        newAuthor.posts.find((obj,index)=>{
            if(JSON.stringify(obj._id) === JSON.stringify(createPostDto._id)){
                i = index;
                newAuthor.posts[index].title = createPostDto.title;
                newAuthor.posts[index].date = new Date();
                return 
            }
        })
        newAuthor.save()
        return newAuthor.posts[i];
    }

    async deletePost(authorId : ObjectIdScalar,id : ObjectIdScalar){
        let newAuthor = await this.authorModel.findOne({_id : authorId}).exec()
        newAuthor.posts.map((obj,index)=>{
            if(JSON.stringify(obj._id) === JSON.stringify(id)){
                newAuthor.posts.splice(index,1) 
                return 
            }
        })
        newAuthor.save()
        return newAuthor
    }

}