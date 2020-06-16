import { ObjectIdScalar } from "../scalars/mongo-object.scalar";

export class CreateAuthorDto {

    readonly firstName: string;
    readonly id?: string;
    readonly lastName?: string;
}