import { Field, Int, ObjectType, InputType, Directive } from "@nestjs/graphql";
import {Post} from './post.model';
import { Paginated } from "./paginated-type";
import { Author } from "./author.model";

@ObjectType()
export class PaginatedAuthor extends Paginated(Author){ 
    
 }