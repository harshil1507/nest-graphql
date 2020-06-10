import { Field, Int, ObjectType, InputType } from "@nestjs/graphql";
import { Author } from "./author.model";

@ObjectType()
@InputType('PostInput')
export class Post{
    @Field(type => Int)
    id: number;

    @Field()
    title: string;

    @Field(type => Int,{nullable: true})
    votes?: number;
}