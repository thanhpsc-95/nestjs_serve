import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { UserDto } from './dto/users.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

    constructor(private readonly usersService: UsersService) { }
    @Post()
    async addUsers(
        @Body() user: UserDto
    ) {
        const generatedId = await this.usersService.insertUsers(user.username, user.password, user.email)
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
        @Body() user: UserDto
    ) {
        return await this.usersService.updateUser({ ...user, id: userId });
    }

    @Delete(':id')
    async deleteUser(@Param('id') userId: string) {
        return await this.usersService.deleteUser(userId)
    }
}
