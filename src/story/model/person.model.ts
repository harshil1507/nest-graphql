import { Field, Int, ObjectType, InputType } from "@nestjs/graphql";
import { ObjectIdScalar } from "../../author/scalars/mongo-object.scalar";
import { Story } from "./story.model";
@ObjectType()
@InputType('PersonInput')
export class Person{
    
    @Field()
    _id: ObjectIdScalar;

    @Field()
    name: string;

    @Field(type => Int,{nullable: true})
    age?: number;

    @Field(type =>[Story])
    stories?: Story[];
}