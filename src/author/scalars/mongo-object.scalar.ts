import { Scalar } from '@nestjs/graphql';
import { Kind, ASTNode } from 'graphql';
import { ObjectId } from "mongodb";
var mongoose = require('mongoose');

@Scalar('MongoObjectId')
export class ObjectIdScalar {
  description = 'Mongo object id scalar type';

  parseValue(value: string) {
    return new ObjectId(value); // value from the client
  }

  serialize(value: ObjectId) {
    return value.toHexString(); // value sent to the client
  }

  parseLiteral(ast: ASTNode) {
    if (ast.kind === Kind.STRING) {
      return new ObjectId(ast.value); // value from the client query
    }
    return null;
  }
}