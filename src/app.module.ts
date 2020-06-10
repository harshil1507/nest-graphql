import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from "@nestjs/graphql";
import { AuthorModule } from './author/author.module'

@Module({
  imports: [
    AuthorModule,
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
      installSubscriptionHandlers: true,
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
