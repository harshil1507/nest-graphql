import { Injectable } from '@nestjs/common';
import {Author} from './models/author.model'
import {Post} from './models/post.model';

@Injectable()
export class PostService{
    findAll(id: Object) : any{
        return id
    }

    upvoteById(id: Object){
        return 'upvoted'
    }
}