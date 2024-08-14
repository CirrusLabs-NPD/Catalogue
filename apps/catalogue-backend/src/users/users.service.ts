import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserClass } from './schemas/user.schema';
import { Model } from 'mongoose';
import { SignInDto } from '../auth/dto/sign-in.dto';

@Injectable()
export class UsersService {
    constructor(@InjectModel(UserClass.name) private userModel: Model<UserClass>) {}

    async getUsers(): Promise<UserClass[]> {
        return await this.userModel.find().exec();
    }

    async findUser(signInDto: SignInDto): Promise<UserClass> {
        let user = await this.userModel.findOne({ email: signInDto.email }).exec();

        if (!user) {
            const newUser = new this.userModel({ ...signInDto, role: 'user' }); // Default role
            user = await newUser.save();
        }

        return user;
    }

    async setUserRole(email: string, role: string): Promise<UserClass> {
        const user = await this.userModel.findOneAndUpdate({ email }, { role }, { new: true }).exec();
        return user;
    }
}
