import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ObjectIdScalar } from '../scalars/mongo-object.scalar';
@Schema()
export class PostDB extends Document{
    @Prop(type=>ObjectIdScalar)
    _id: string;

    @Prop()
    title: string;

    @Prop()
    votes?: number;

    @Prop()
    date?: Date;

}


@Schema()
export class AuthorDB extends Document{

    @Prop(type=>ObjectIdScalar)
    _id: string
    
    @Prop()
    firstName: string;

    @Prop()
    lastName: string;

    @Prop([PostDB],)
    posts: PostDB[]

}

export const AuthorSchema = SchemaFactory.createForClass(AuthorDB);
export const PostSchema = SchemaFactory.createForClass(PostDB);