import { Injectable,ConflictException } from '@nestjs/common';
import {Author} from './models/author.model'
import {Post} from './models/post.model';
import {AuthorService} from './author.service'
import {UpvotePostInput} from './dto/upvote.input';
import { NewAuthor } from "./dto/author.input";
@Injectable()
export class PostService extends AuthorService{
    private posts: Post[] = []

    findAll(id: Object) : any{
        return id
    }

    showAllPosts(){
        return this.posts;
    }

    findPost(id :number){
        console.log(this.posts)
        return this.posts.findIndex(prod=>prod.id===id);
    }

    insertPost(id:number, title: string, votes?: number){
        const checkPostExist = this.posts[this.findPost(id)];
        console.log(checkPostExist)
        if(checkPostExist){
            throw new ConflictException('Post with this id already exists');
        }
        const post={id: id, title: title,votes: votes}
        this.posts.push(post);
        return post;
    }

    upvoteById(id: number){
        const prodIndex = this.findPost(id)
        this.posts[prodIndex].votes = this.posts[prodIndex].votes+1;
        return this.posts[prodIndex]

    }
}