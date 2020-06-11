import { Module } from '@nestjs/common';
import {AuthorResolver} from './author.resolver'
import {AuthorService} from './author.service';
import {PostService} from './post.service';
import {DateScalar} from './scalars/custom-scalar.scalar-type';
@Module({
  providers: [AuthorResolver, AuthorService, PostService , DateScalar],
})
export class AuthorModule{}