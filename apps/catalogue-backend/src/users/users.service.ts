import { Injectable, NotFoundException } from '@nestjs/common';
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
            const newUser = new this.userModel({ ...signInDto, role: 'member', status: 'active'});
            user = await newUser.save();
        }

        return user;
    }

    async setUserRole(email: string, role: string): Promise<UserClass> {
        const user = await this.userModel.findOneAndUpdate({ email }, { role }, { new: true }).exec();
        return user;
    }

    async setUserStatus(email: string, status: string): Promise<UserClass> {
        const user = await this.userModel.findOneAndUpdate({ email }, { status }, { new: true }).exec();
        return user;
    }

    async deleteUser(id: string): Promise<UserClass> {
        const user = await this.userModel.findByIdAndDelete(id);
        if (!user) {
          throw new NotFoundException(`User with ID "${id}" not found`);
        }
        return user;
    }
}
