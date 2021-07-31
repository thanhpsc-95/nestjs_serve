import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

    constructor(private readonly usersService: UsersService) { }
    @Post()
    async addUsers(
        @Body('username') username: string,
        @Body('password') password: string
    ) {
        const generatedId = await this.usersService.insertUsers(username, password)
        return { id: generatedId };
    }
    @Get()
    async getAllUsers() {
        return await this.usersService.getAllUsers();
    }

    @Get(':id')
    async getSingleUser(@Param('id') userId: string) {
        return await this.usersService.getSingleUser(userId)
    }

    @Patch(':id')
    async updateUser(
        @Param('id') userId: string,
        @Body('username') username: string,
        @Body('password') passport: string) {
        return await this.usersService.updateUser(userId, username, passport)
    }

    @Delete(':id')
    async deleteUser(@Param('id') userId: string) {
        return await this.usersService.deleteUser(userId)
    }

}
