import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserClass } from './schemas/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
    constructor(@InjectModel(UserClass.name) private userModel: Model<UserClass>) {}
    
    async findUser(email: string) {
        return await this.userModel.findOne({ email: email }).exec();
    }
}
