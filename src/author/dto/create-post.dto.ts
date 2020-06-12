export class CreatePostDto{
    readonly authorId : number;
    readonly id : number;
    readonly title : string;
    readonly votes : number;
    readonly date : Date;
}