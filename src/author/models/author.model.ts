import { Field, Int, ObjectType, InputType } from "@nestjs/graphql";
import {Post} from './post.model';
import { IsOptional } from "class-validator";

@ObjectType()
@InputType('AuthorInput')
export class Author {
    @Field(type => Int)
    id: number;
  
    @Field({ nullable: true })
    firstName?: string;
  
    @Field({ nullable: true })
    lastName?: string;
  
    @Field(type => [Post],{nullable:"items"})
    @IsOptional()
    posts: Post[];
  }