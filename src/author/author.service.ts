import { Injectable,ConflictException, NotFoundException } from '@nestjs/common';
import {Author} from './models/author.model'
import {Post} from './models/post.model';
import { InjectModel } from '@nestjs/mongoose';
import { AuthorDB,PostDB } from "./schemas/author.schema";
import { Model } from 'mongoose';
import { CreateAuthorDto } from "./dto/create-author.dto";
import { ObjectIdScalar } from './scalars/mongo-object.scalar';
var mongoose = require('mongoose');
@Injectable()
export class AuthorService{

    constructor(
        @InjectModel(AuthorDB.name)protected authorModel: Model<AuthorDB>,
        @InjectModel(PostDB.name)protected postModel: Model<PostDB>,
        ){}
    
        async checkAuthorPresent(id?: ObjectIdScalar) : Promise<AuthorDB[]>{
        if(id)  return this.authorModel.find({id: id}).exec();
        return this.authorModel.find().exec();
    }

    async create(createAuthorDto : CreateAuthorDto): Promise<AuthorDB>{
        const createdAuthor = new this.authorModel(createAuthorDto);
        createdAuthor._id = new mongoose.Types.ObjectId();
        console.log(createdAuthor)

        if((await this.checkAuthorPresent(createdAuthor._id)).length !== 0)
            throw new ConflictException;
        else    return createdAuthor.save();
    }

    async deleteAuthor(id: ObjectIdScalar): Promise<Boolean>{
        console.log(id)
        let a = await this.authorModel.deleteOne({_id:id}).exec()
        if(a.n === 1 )
            return true
        return false
    }

    async updateAuthor(id: ObjectIdScalar, firstName?: string, lastName?: string){
        let newAuthor = await this.authorModel.findOne({_id:id}).exec()
        if(firstName) newAuthor.firstName = firstName;
        if(lastName) newAuthor.lastName = lastName;
        return newAuthor.save();
    }

    async fetchAllAuthors(cursor:ObjectIdScalar, limit?: number, reverse?: boolean) : Promise<AuthorDB[]>{
                
        if(limit){
            if(cursor){
                if(reverse === true) return this.authorModel.find({_id : {$lte : cursor}}).limit(limit).exec()
                return this.authorModel.find({_id : {$gte : cursor}}).limit(limit).exec()
            }
            if(reverse === true) return this.authorModel.find().limit(limit).exec()
            return this.authorModel.find().limit(limit).exec()
        
        }
        if(cursor){
            if(reverse === true) return this.authorModel.find({_id : {$lte : cursor}}).exec()
            return this.authorModel.find({_id : {$gte : cursor}}).exec()
        }

        return this.authorModel.find().limit(limit).exec()
    }



}