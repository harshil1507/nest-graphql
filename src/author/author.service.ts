import { Injectable } from '@nestjs/common';
import {Author} from './models/author.model'
import {Post} from './models/post.model';

@Injectable()
export class AuthorService{
    findOneById(id: number){
        return id;
    }

    addAuthor(
        id: number,
        posts?: [Post], 
        firstName?: string, 
        lastName?: string){

    }
}