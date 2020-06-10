import { Field, InputType } from '@nestjs/graphql';
import { IsOptional, Length, MaxLength } from 'class-validator';
import {Post} from '../models/post.model';

@InputType()
export class NewAuthor {
    @Field()
    id: number;

    @Field()
    firstName: string;

    @Field()
    lastName: string;

    @Field(type=>[Post])
    posts: Post[];
}