import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class PostDB extends Document{
    @Prop()
    id: number;

    @Prop()
    title: string;

    @Prop()
    votes?: number;

    @Prop()
    date?: Date;

}


@Schema()
export class AuthorDB extends Document{

    @Prop()
    id: number;
    
    @Prop()
    firstName: string;

    @Prop()
    lastName: string;

    @Prop([PostDB],)
    posts: PostDB[]

}

export const AuthorSchema = SchemaFactory.createForClass(AuthorDB);
export const PostSchema = SchemaFactory.createForClass(PostDB);