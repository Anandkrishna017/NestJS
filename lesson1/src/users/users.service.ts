import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {

    private users = [
        {
            "id": 1,
            "name": "sam",
            "email": "sam@gmail.com",
            "role": "admin"
        },
        {
            "id": 2,
            "name": "john",
            "email": "john@gmail.com",
            "role": "engineer"
        },
        {
            "id": 3,
            "name": "manu",
            "email": "manu@gmail.com",
            "role": "intern"
        },
        {
            "id": 4,
            "name": "max",
            "email": "max@gmail.com",
            "role": "engineer"
        },
    ]

    findAll(role?: 'intern' | 'admin' | 'engineer') {
        if (role) {
            const role= this.users.filter(user => user.role === role)
            if(role.length==0){
                throw new NotFoundException("Role not Found")
            }
            return role
        }
        return this.users;
    }

    findOne(id: number) {
        const user = this.users.find(user => user.id === id)
        if(!user){
            throw new NotFoundException("User not found")
        }
        return user
    }

    create(createUserDto: CreateUserDto) {
        const usersByHigherId = [...this.users].sort((a, b) => b.id - a.id) // for sorting
        const newUser = {
            id: usersByHigherId[0].id + 1,
            ...createUserDto
        }
        this.users.push(newUser)
        return newUser
    }

    update(id: number, updateUserDto: UpdateUserDto) {
        this.users = this.users.map(user => {
            if (user.id === id) {
                return { ...user, ...updateUserDto }
            }
            return user
        })
        return this.findOne(id) // return the updated user
    }

    delete(id: number) {
        const removeduser = this.findOne(id)
        this.users = this.users.filter(user => user.id !== id)
        return removeduser
    }
}

