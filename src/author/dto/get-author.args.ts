import { MinLength } from 'class-validator';
import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
class GetAuthorArgs{
    @Field({nullable : true})
    firstName?: string;

    @Field({defaultValue: ''})
    @MinLength(3)
    lastName: string;
}