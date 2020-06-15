import { ObjectIdScalar } from "../scalars/mongo-object.scalar";

export class CreatePostDto{
    readonly authorId : ObjectIdScalar;
    readonly title : string;
    readonly _id ?: ObjectIdScalar;
    readonly votes ?: number;
    readonly date ?: Date ;
}