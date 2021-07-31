import { Injectable, NotFoundException, NotImplementedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './users.model';
import { generatePassword } from './../utils/bscrypt';

@Injectable()
export class UsersService {
    constructor(@InjectModel('User') private readonly userModel: Model<User>) { }

    private async findUser(id: string): Promise<User> {
        let user;
        try {
            user = await this.userModel.findById(id)
        } catch (error) {
            throw new NotFoundException("No user found");
        }
        if (!user) {
            throw new NotFoundException("No user found");
        }
        return user;
    }

    async insertUsers(username: string, password: string): Promise<string> {
        const hashedPassword = await generatePassword(password);
        const newUser = await new this.userModel({ username, password: hashedPassword });
        const saveResult = await newUser.save();
        return saveResult.id as string;
    }

    async getAllUsers() {
        const Users = await this.userModel.find().exec();
        return Users.map(user => ({ id: user.id, username: user.username, password: user.password }));
    }

    async getSingleUser(id: string) {
        const user = await this.findUser(id);
        return { id: user.id, username: user.username, password: user.password }
    }
    async updateUser(id: string, username: string, password: string) {
        const updatedUser = await this.findUser(id);
        if (username) {
            updatedUser.username = username
        }
        if (password) {
            const hashedPassword = await generatePassword(password);
            updatedUser.password = hashedPassword;
        }
        updatedUser.save()
        return null
    }

    async deleteUser(id: string) {
        const deleteResult = await this.userModel.deleteOne({ _id: id }).exec();
        if (deleteResult.n === 0) {
            throw new NotImplementedException('Delete failed')
        } else {
            return null
        }
    }

    async findOne(userUsername: string): Promise<User | undefined> {
        return this.userModel.findOne({ username: userUsername });
    }
}
