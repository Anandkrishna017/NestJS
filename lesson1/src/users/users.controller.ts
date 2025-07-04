import { Body, Controller, Delete, Get, Param, Patch, Post, Query, ParseIntPipe, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {

    constructor (private readonly userService : UsersService){}


    @Get() //  /users route
    findAll(@Query('role') role?:'intern'| 'admin' | 'engineer' ){
        return this.userService.findAll(role)
    }

    @Get(':id')  // /users/:id
    findOne(@Param('id', ParseIntPipe) id: number){
        return this.userService.findOne(id)
    }

    @Post() // /users
    create(@Body(ValidationPipe) createUserDto:CreateUserDto){
        // const{name,email,role}=createUserDto;
        // if(typeof name!=='string'){
        //     return 'name must be string';
        // }

        return this.userService.create(createUserDto)
    }

    @Patch(':id') // /users/:id
    update(@Param('id', ParseIntPipe) id: number, @Body(ValidationPipe) updateUserDto:UpdateUserDto){
        return this.userService.update(id,updateUserDto)
    }

    @Delete(':id') // /users/:id
    delete(@Param('id', ParseIntPipe) id : number){
        return this.userService.delete(id)
    }
}
