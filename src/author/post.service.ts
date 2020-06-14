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

@Injectable()
export class PostService extends AuthorService{
    private posts: Post[] = []


    constructor(@InjectModel(PostDB.name) private postModel : Model<PostDB>){
        super()
    }

    async addPost(createPostDto : CreatePostDto): Promise<AuthorDB>{
        let newAuthor = new this.authorModel(CreateAuthorDto);
        // newAuthor = this.authorModel.findOne({id : createPostDto.authorId}).exec()
        let newPost = new this.postModel(CreatePostDto);
        newPost.id = createPostDto.id;
        newPost.title = createPostDto.title;
        newPost.votes = 0;
        newAuthor.posts.push(newPost);
        return newAuthor.save()
         
    }

    //------------------OLD QUERIES-----------------------//

    // findAll(id: Object) : any{
    //     return id
    // }

    // showAllPosts(){
    //     return this.posts;
    // }

    // findPost(id :number){
    //     //console.log(this.posts)
    //     return this.posts.findIndex(prod=>prod.id===id);
    // }

    // insertPost(
    //     id:number, 
    //     title: string,
    //     votes?: number,
    //     date?: Date,
    // ){
    //     const checkPostExist = this.posts[this.findPost(id)];
    //     //console.log(checkPostExist)
    //     if(checkPostExist){
    //         throw new ConflictException('Post with this id already exists');
    //     }
    //     const post={id: id, title: title,votes: votes,date: date}
    //     this.posts.push(post);
    //     return post;
    // }

    // upvoteById(id: number){
    //     const prodIndex = this.findPost(id)
    //     this.posts[prodIndex].votes = this.posts[prodIndex].votes+1;
    //     return this.posts[prodIndex]

    // }
}