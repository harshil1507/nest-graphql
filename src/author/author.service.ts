import { Injectable } from '@nestjs/common';
import {Author} from './models/author.model'
import {Post} from './models/post.model';

@Injectable()
export class AuthorService{
    findOneById(id: number){
        return id;
    }
}