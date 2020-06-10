import { Module } from '@nestjs/common';
import {AuthorResolver} from './author.resolver'
import {AuthorService} from './author.service';
import {PostService} from './post.service';

@Module({
  providers: [AuthorResolver, AuthorService, PostService ],
})
export class AuthorModule{}