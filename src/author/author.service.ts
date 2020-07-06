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
    
        async checkAuthorPresent(id?: string) : Promise<AuthorDB[]>{
        if(id)  return this.authorModel.find({id: id}).exec();
        return this.authorModel.find().exec();
    }

    async create(createAuthorDto : CreateAuthorDto): Promise<AuthorDB>{
        const createdAuthor = new this.authorModel(createAuthorDto);
        createdAuthor._id = new mongoose.Types.ObjectId();

        if((await this.checkAuthorPresent(createdAuthor._id)).length !== 0)
            throw new ConflictException;
        else    return createdAuthor.save();
    }

    async deleteAuthor(id: string): Promise<Boolean>{
        id = new mongoose.Types.ObjectId(id)
        let a = await this.authorModel.deleteOne({_id:id}).exec()
        if(a.n === 1 )
            return true
        return false
    }

    async updateAuthor(id: string, firstName?: string, lastName?: string){
        id = new mongoose.Types.ObjectId(id)
        let newAuthor = await this.authorModel.findOne({_id:id}).exec()
        if(firstName) newAuthor.firstName = firstName;
        if(lastName) newAuthor.lastName = lastName;
        return newAuthor.save();
    }

    async fetchAllAuthors(cursor:string, limit?: number, reverse?: boolean) : Promise<AuthorDB[]>{
        if(limit){
            if(cursor){
                cursor = new mongoose.Types.ObjectId(cursor);
                if(reverse === true) return this.authorModel.find({_id : {$lt : cursor}}).limit(limit).exec()
                return this.authorModel.find({_id : {$gt : cursor}}).limit(limit).exec()
            }
            if(reverse === true) return this.authorModel.find().limit(limit).exec()
            return this.authorModel.find().limit(limit).exec()
        
        }
        if(cursor){
            cursor = new mongoose.Types.ObjectId(cursor);
            if(reverse === true) return this.authorModel.find({_id : {$lt : cursor}}).exec()
            return this.authorModel.find({_id : {$gt : cursor}}).exec()
        }

        return this.authorModel.find().limit(limit).exec()
    }



}