import { Field, Int, ObjectType, InputType } from "@nestjs/graphql";
import { Author } from "./author.model";
import {DateScalar} from '../scalars/custom-scalar.scalar-type'

@ObjectType()
@InputType('PostInput')
export class Post{
    @Field()
    id: number;

    @Field()
    title: string;

    @Field(type => Int,{nullable: true})
    votes?: number;

    @Field()
    date?: Date;
}