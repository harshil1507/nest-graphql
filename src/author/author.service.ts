import { Injectable,ConflictException } from '@nestjs/common';
import {Author} from './models/author.model'
import {PaginatedAuthor} from './models/paginated-author.model'
import {Post} from './models/post.model';
@Injectable()
export class AuthorService{

    private authors : Author[] = [];
    private authorsPaginated : PaginatedAuthor;
    private limit : number = 2;
    private next: number|null = null;
    //private prev: number|null = null;
    
    pagedAuthor(first: number){
        let totalCount = this.authors.length;
        let hasNextPage: boolean;
        if (first < totalCount){
            hasNextPage = true;
        }
        else    hasNextPage = false;
        
        const edge={
            cursor: '',
            node : this.authors.filter((auth)=>{})
        }
        
        const mapping ={
            edges: edge,
            totalCount : totalCount,
            hasNextPage : hasNextPage
        }
                
        return this.authorsPaginated = mapping;
    }

    findOneById(id: number){
        return this.authors.findIndex(author=> author.id === id)
    }

    pagination(first: number, limitQuery: number = this.limit){
        let index = this.findOneById(first);
        return this.authors.slice(index, index+limitQuery)
    }

    findAll(){
        return this.authors;
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
        //posts?: Post[]
        ){
            const checkAuthor = this.findOneById(id);
            if(this.authors[checkAuthor]){
                throw new ConflictException('Author already exists with this id')
            }
            else
            {
                const newAuthor = {
                    id : id,
                    firstName : firstName,
                    lastName : '',
                    // posts : [],
                }
                if(lastName){newAuthor.lastName = lastName}
                // if(posts){newAuthor.posts = posts}
                this.authors.push(newAuthor);
                return newAuthor;
            }
    }
}