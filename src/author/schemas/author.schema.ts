import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Post extends Document{
    @Prop()
    id: number;

    @Prop()
    title: string;

    @Prop()
    firstName: string;
    
    @Prop()
    votes: number;

    @Prop()
    date: Date;

}


@Schema()
export class AuthorClass extends Document{

    @Prop()
    id: number;
    
    @Prop()
    firstName: string;

    @Prop()
    lastName: string;

    @Prop([Post])
    posts: Post[]

}

export const AuthorSchema = SchemaFactory.createForClass(AuthorClass);