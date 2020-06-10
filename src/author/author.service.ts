import { Injectable,ConflictException } from '@nestjs/common';
import {Author} from './models/author.model'
import {Post} from './models/post.model';
@Injectable()
export class AuthorService{

    protected authors : Author[] = []

    findOneById(id: number){
        return this.authors.findIndex(author=> author.id === id)
    }

    findAuthor(id:number){
        const index = this.findOneById(id)
        if(this.authors[index]){    return this.authors[index]  }
        else{   return "Not Found" } 
    }

    addAuthor(
        id: number,
        firstName: string, 
        lastName?: string,
        posts?: Post[]
        ){
            const checkAuthor = this.findOneById(id);
            if(this.authors[id]){
                throw new ConflictException('Author already exists with this id')
            }
            else
            {
                const newAuthor = {
                    id : id,
                    firstName : firstName,
                    lastName : lastName,
                    posts : posts,
                }
                this.authors.push(newAuthor);
                return newAuthor;
            }
    }
}