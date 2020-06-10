import { Field, Int, ObjectType, InputType } from "@nestjs/graphql";
import {Post} from './post.model';

@ObjectType()
@InputType('AuthorInput')
export class Author {
    @Field(type => Int)
    id: number;
  
    @Field({ nullable: true })
    firstName?: string;
  
    @Field({ nullable: true })
    lastName?: string;
  
    @Field(type => [Post],{nullable:true})
    posts?: Post[];
  }