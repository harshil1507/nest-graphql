import { ObjectIdScalar } from "../scalars/mongo-object.scalar";

export class CreatePostDto{
    readonly authorId : string;
    readonly title : string;
    readonly _id ?: string;
    readonly votes ?: number;
    readonly date ?: Date ;
}