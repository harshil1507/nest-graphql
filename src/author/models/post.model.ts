import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Author } from "./author.model";

@ObjectType()
export class Post{
    @Field(type => Int)
    id: number;

    @Field()
    title: string;

    @Field(type => Int,{nullable: true})
    votes?: number

    // @Field(type=>Int,{nullable:"items"})
    // author: Author
}