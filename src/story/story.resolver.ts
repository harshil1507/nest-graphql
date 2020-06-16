import { Resolver, Args, Int, ResolveField, Parent, Query, Mutation, Subscription } from "@nestjs/graphql";
import { StoryService } from "./story.service";
import { ObjectIdScalar } from "../author/scalars/mongo-object.scalar";
import {Person} from './model/person.model';
import {Story} from './model/story.model';

@Resolver(of => Story)
export class StoryResolver{
    constructor(
        private storyService : StoryService,
    ){}

//--------Queries-----------
@Query(returns => Story)
async populate(){
    return this.storyService.populateAuthorStory();
}

@Query(returns => [Story])
async aggregate(){
    return this.storyService.aggregate();
}


//--------Mutations-----------
@Mutation(returns => Story)
async saveStatic(){
    return this.storyService.addAuthorStory();
}
   


}