import { ConflictException, Injectable, NotFoundException, NotImplementedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { generatePassword } from './../utils/bscrypt';
import { UserDto } from './dto/users.dto';
import { User } from './interface/users.inteface';

@Injectable()
export class UsersService {
    constructor(@InjectModel('User') private readonly userModel: Model<User>) { }

    private async findUser(id: string): Promise<any> {
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

    async insertUsers(username: string, password: string): Promise<any> {
        const isExistsUsername = await this.userModel.findOne({ username: username });
        if (isExistsUsername) {
            throw new ConflictException("The usename already exist")
        } else {
            const hashedPassword = await generatePassword(password);
            const newUser = await new this.userModel({ username, password: hashedPassword });
            const saveResult = await newUser.save();
            return saveResult.id as string;
        }
    }

    async getAllUsers() {
        const users = await this.userModel.find().exec();
        return users;
    }

    async getSingleUser(id: string) {
        const user = await this.findUser(id);
        return user;
    }
    async updateUser(user: UserDto) {
        const updatedUser = await this.findUser(user.id);
        if (user.username) {
            updatedUser.username = user.username
        }
        if (user.password) {
            const hashedPassword = await generatePassword(user.password);
            updatedUser.password = hashedPassword;
        }
        updatedUser.save()
        return null
    }

    async deleteUser(id: string) {
        const isExistsUsername = await this.findUser(id);
        if (isExistsUsername) {
            const deleteResult = await this.userModel.deleteOne({ _id: id }).exec();
            if (deleteResult.n === 0) {
                throw new NotImplementedException('Delete failed')
            } else {
                return null
            }

        }
    }
}
