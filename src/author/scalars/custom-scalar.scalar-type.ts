import { Scalar, CustomScalar } from "@nestjs/graphql";
import { Kind, ValueNode } from "graphql";

@Scalar('Date', type=> Date)
export class DateScalar implements CustomScalar<number, Date>{
    description = 'Custom scalar for Date';

    parseValue(value: number): Date{
        return new Date(value);
    }

    serialize(value: Date):number{
        return value.getTime();
    }

    parseLiteral(ast: ValueNode): Date{
        if(ast.kind === Kind.INT){
            return new Date(ast.value);
        }
        return null;
    }
}