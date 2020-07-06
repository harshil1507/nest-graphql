import { Injectable } from '@nestjs/common';
import { Story,Person } from "./schema/story.schema";
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
var mongoose = require('mongoose');

@Injectable()
export class StoryService {

    constructor(
        @InjectModel(Story.name) protected storyModel : Model<Story>,
        @InjectModel(Person.name) protected personModel : Model<Person>
    ){}

    async addAuthorStory(){
        const author = new this.personModel({
            _id: new mongoose.Types.ObjectId(),
            name: 'Ian Fleming',
            age: 50
        });

        await author.save();

        const story1 = new this.storyModel({
            title : 'Casino Royale',
            author : author._id,
        });

        return story1.save()
    }

    async populateAuthorStory(): Promise<Story>{
      let result = await this.storyModel.findOne({title:'Casino Royale'}).
        populate({
            path : "author",
            model : "Person"
        }).
        exec()
        
        return result;
    }

    async aggregate(): Promise<Story>{
        let result = await this.storyModel.aggregate([
            {
                $lookup: {
                    from:"people",
                    localField : "author",
                    foreignField : "_id",
                    as: "author"
                }
            },
            {
                $project :{
                    "author.stories" : 0
                }
            }
            
        ]).exec()
        return result
    }

}
