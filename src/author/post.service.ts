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
export class PostService{
    private posts: Post[] = []


    constructor(@InjectModel(PostDB.name) private postModel : Model<PostDB>){}


    //------------------OLD QUERIES-----------------------//

    findAll(id: Object) : any{
        return id
    }

}