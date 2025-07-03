import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.interface';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Get()
    getAllUsers() {
        return this.userService.getAllUsers()
    }

    @Get(':id')
    getUser(@Param("id") id: string) {
        return this.userService.getUser(id)
    }

    @Post("add")
    addUser(@Body() user: User) {
        return this.userService.addUser(user)
    }

    @Patch(':id')
    updateUser(@Param("id")id:string,@Body()user:User){
       return this.userService.updateUser(user,id)
    }

    @Delete(":id")
    deleteUser(@Param("id")id:string){
       return this.userService.deleteUser(id)
    }
}
