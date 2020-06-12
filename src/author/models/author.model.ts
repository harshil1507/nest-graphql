import { Field, Int, ObjectType, InputType, Directive } from "@nestjs/graphql";
import {Post} from './post.model';
@ObjectType()
@InputType('AuthorInput')
export class Author {
    @Field(type => Int,{complexity:10})
    id: number;
  
    @Field({ nullable: true , complexity:10})
    firstName?: string;
  
    @Directive('@upper')
    @Field({ nullable: true ,complexity:1})
    lastName?: string;
  
    @Field(type => [Post],{nullable:"itemsAndList"})
    posts?: Post[];
  
    @Field(type=>Int,{nullable:true})
    next?: number|null;

    @Field(type=>Int,{nullable:true})
    prev?: number|null;

  }


/*
  cursor implementation
  add cursor field
  
  Changes in query
  first - no. of queries to be implemented
  after - after which cursor/element

  auto pagination
  assign cursor value of latest element to the after field 

  slice method 
  */