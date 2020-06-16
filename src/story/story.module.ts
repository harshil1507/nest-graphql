import { Module } from '@nestjs/common';
import { GraphQLSchemaHost} from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { Story,StorySchema,Person,PersonSchema } from "./schema/story.schema";
import { StoryService } from './story.service';
import { StoryResolver } from './story.resolver';
@Module({
  imports:[
    MongooseModule.forFeature([{
      name: Person.name,
       schema: PersonSchema
      }]),
    MongooseModule.forFeature([{
      name : Story.name,
      schema: StorySchema
    }])
    ],
  providers: [
      StoryService,
      StoryResolver,
    GraphQLSchemaHost,
  ],
})
export class StoryModule{}