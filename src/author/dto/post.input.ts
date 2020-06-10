import { Author } from "../models/author.model";
import { Field, Int, InputType } from "@nestjs/graphql";

@InputType()
export class PostInput{
    @Field()
    id: number;

    @Field()
    title: string;

    @Field(type=>Int)
    votes?: number;

    @Field(type=>Author)
    author:Author
}