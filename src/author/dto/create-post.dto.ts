export class CreatePostDto{
    readonly authorId : number;
    readonly title : string;
    readonly id : number;
    readonly votes ?: number;
    readonly date ?: Date ;
}