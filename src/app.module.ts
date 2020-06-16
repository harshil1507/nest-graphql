import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from "@nestjs/graphql";
import { AuthorModule } from './author/author.module'
import {UpperCaseDirective} from './author/directives/upper-case.directive'
// import { ComplexityPlugin } from "./author/plugins/complexity.plugin";
import { MongooseModule } from "@nestjs/mongoose";
import {StoryModule} from './story/story.module'
@Module({
  imports: [
    AuthorModule,
    StoryModule,
    MongooseModule.forRoot('mongodb+srv://harshil:harshil@123@cluster0-stbbj.mongodb.net/Nest?retryWrites=true&w=majority'),
    GraphQLModule.forRoot({
      schemaDirectives: {
        upper : UpperCaseDirective,
      },
      autoSchemaFile: 'schema.gql',
      installSubscriptionHandlers: true,
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
