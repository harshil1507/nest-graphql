import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as mongooseSchema} from 'mongoose';
import { ObjectIdScalar } from '../../author/scalars/mongo-object.scalar';

@Schema()
export class Person extends Document{

    @Prop()
    _id : ObjectIdScalar;

    @Prop()
    name: string;
    
    @Prop()
    age : number;

    @Prop()
    stories : [{
        type : mongooseSchema.Types.ObjectId,
        ref : "Story"
    }]
}

@Schema()
export class Story extends Document{
    @Prop()
    author : [{
        type: mongooseSchema.Types.ObjectId,
        ref : "Person"
    }];

    @Prop()
    title : string;

    @Prop()
    fans : [{
        type: mongooseSchema.Types.ObjectId,
        ref : "Person"
    }]
}

export const PersonSchema = SchemaFactory.createForClass(Person);
export const StorySchema = SchemaFactory.createForClass(Story);
