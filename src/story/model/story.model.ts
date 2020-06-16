import { Field, Int, ObjectType, InputType } from "@nestjs/graphql";
import { ObjectIdScalar } from "../../author/scalars/mongo-object.scalar";
import { Person } from "./person.model";

@ObjectType()
@InputType('StoryInput')
export class Story{
    @Field()
    _id: ObjectIdScalar;

    @Field(type => [Person])
    author: Person[];
  
    @Field()
    title : string;

    @Field(type => [Person])
    fans?: Person[];
}