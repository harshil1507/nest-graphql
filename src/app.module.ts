import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from "@nestjs/graphql";
import { AuthorModule } from './author/author.module'
import {UpperCaseDirective} from './author/directives/upper-case.directive'
// import { ComplexityPlugin } from "./author/plugins/complexity.plugin";
@Module({
  imports: [
    AuthorModule,
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
