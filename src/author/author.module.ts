import { Module } from '@nestjs/common';
import {AuthorResolver} from './author.resolver'
import {AuthorService} from './author.service';
import {PostService} from './post.service';
import {DateScalar} from './scalars/custom-scalar.scalar-type';
import { ServerStartPlugin, LoggingPlugin } from "./plugins/request.plugin";
// import { ComplexityPlugin } from "./plugins/complexity.plugin";
import { GraphQLSchemaHost} from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthorDB, AuthorSchema, PostDB, PostSchema } from './schemas/author.schema';

@Module({
  imports:[
    MongooseModule.forFeature([{
      name: AuthorDB.name,
       schema: AuthorSchema
      }]),
    MongooseModule.forFeature([{
      name : PostDB.name,
      schema: PostSchema
    }])
    ],
  providers: [
    AuthorResolver, 
    AuthorService, 
    PostService , 
    DateScalar,
    // ServerStartPlugin,
    // LoggingPlugin,
    // //ComplexityPlugin,
    GraphQLSchemaHost,
  ],
})
export class AuthorModule{}