import { Injectable,ConflictException } from '@nestjs/common';
import {Author} from './models/author.model'
import {PaginatedAuthor} from './models/paginated-author.model'
import {Post} from './models/post.model';
@Injectable()
export class AuthorService{

    private authors : Author[] = [];
    private limit : number = 2;
    private prevPointer : number|null = null;
    private count :number =0;
    private start: number|null = null;

        findOneById(id: number){
        return this.authors.findIndex(author=> author.id === id)
    }

    pagination(cursor: number,limitQuery: number = this.limit){

        let index = this.findOneById(cursor);
        return this.authors.slice(index, index+limitQuery)
    }

    autoPage(cursor: number = this.start,limitQuery: number = this.limit){
        
        let limit = limitQuery
        let index = this.findOneById(cursor);

        if(index + limitQuery > this.count ){
            limit = this.count-index;
        }
        let next = this.authors.slice(index+limit,index+limit+1);
        //console.log(limit,next)
        if(next.length > 0){
            this.start = next[0].id;
            return this.authors.slice(index,index+limit);
        }
        return this.authors.slice(index);  
    }

    bothWayPagination(
        ascending: boolean = true,
        cursor: number = this.start,
        limit:number = this.limit){

            let results= []
            let index;
            if(ascending === true){
                for(let i=0 ;i<limit; i++){
                    index = this.findOneById(cursor)
                    results.push(this.authors[index]);
                    if(this.authors[index].next === null){
                        break;
                    }
                    cursor = this.authors[index].next;
                }
                return results;
            }

            else{
                for(let i=0 ;i<limit; i++){
                    index = this.findOneById(cursor)
                    results.push(this.authors[index]);
                    if(this.authors[index].prev === null){
                        break;
                    }
                    cursor = this.authors[index].prev;
                }
                return results;
            }

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
                    posts : [],
                    next: null,
                    prev: null,
                }
                newAuthor.prev = this.prevPointer;
                console.log(this.prevPointer)
                if(this.prevPointer!==null){
                    
                    newAuthor.prev = this.prevPointer;
                    this.authors[this.findOneById(this.prevPointer)].next=id;
                }
                if(lastName){newAuthor.lastName = lastName}
                // if(posts){newAuthor.posts = posts}
                if(this.start===null){
                    this.start=id;                   
                }
                this.prevPointer = id;
                this.count= this.count + 1;
                // console.log(this.count)
                this.authors.push(newAuthor);
                return newAuthor;
            }
    }

    // pagedAuthor(first: number){
    //     let totalCount = this.authors.length;
    //     let hasNextPage: boolean;
    //     if (first < totalCount){
    //         hasNextPage = true;
    //     }
    //     else    hasNextPage = false;
        
    //     const edge={
    //         cursor: '',
    //         node : this.authors.filter((auth)=>{})
    //     }
        
    //     const mapping ={
    //         edges: edge,
    //         totalCount : totalCount,
    //         hasNextPage : hasNextPage
    //     }
                
    //     return this.authorsPaginated = mapping;
    // }
}