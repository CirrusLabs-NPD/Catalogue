import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserClass } from './schemas/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
    constructor(@InjectModel(UserClass.name) private userModel: Model<UserClass>) {}

    // private readonly users = [
    //     {
    //         email: "arjun.saini@cirruslabs.io"
    //     },
    //     {
    //         email: "braden.johnson@cirruslabs.io"
    //     },
    //     {
    //         email: "farhan.soomro@cirruslabs.io"
    //     },
    //     {
    //         email: "rohan.shah@cirruslabs.io"
    //     },
    // ]

    async findUser(email: string) {
        return await this.userModel.findOne({ email: email }).exec();
        // return this.users.find(user => user.email === email);
    }
}
