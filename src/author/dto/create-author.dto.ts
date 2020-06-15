import { ObjectIdScalar } from "../scalars/mongo-object.scalar";

export class CreateAuthorDto {

    readonly firstName: string;
    readonly id?: ObjectIdScalar;
    readonly lastName?: string;
}