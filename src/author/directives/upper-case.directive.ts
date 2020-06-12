import { SchemaDirectiveVisitor } from "apollo-server-express";
import { defaultFieldResolver, GraphQLField } from "graphql";

export class UpperCaseDirective extends SchemaDirectiveVisitor{
    visitFieldDefinition(field: GraphQLField<any,any>){
        const {resolve = defaultFieldResolver} = field;
        //console.log(field,'field obj');
        field.resolve = async function(...args){
            const result = await resolve.apply(this,args);
            //console.log(result,'result')
            if(typeof result === 'string'){
                //console.log(result, typeof result)
                return result.toUpperCase();
            }
            return result;
        };
    }
}