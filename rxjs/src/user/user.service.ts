import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { Axios, AxiosResponse } from 'axios';
import { map, Observable, switchMap } from 'rxjs';
import { User } from './user.interface';

@Injectable()
export class UserService {
    constructor(private readonly httpService: HttpService) { }

    //Get all users
    getAllUsers() {
        return this.httpService.get('https://dummyjson.com/users').pipe(
            map((resp) => {
                console.log("in map");
                return resp.data.users
            }),
            switchMap((res) => {
                console.log("in switchmap",);
                return res
            })
        )


    }

    getUser(id: string): Observable<AxiosResponse<User>> {
        return this.httpService.get(`https://dummyjson.com/users/${id}`).pipe(map((resp) => resp.data))
    }

    addUser(body: User): Observable<AxiosResponse<User>> {
        return this.httpService.post(`https://dummyjson.com/users/add`, { body, }).pipe(map((resp) => resp.data))
    }

    updateUser(body: User, id: string): Observable<AxiosResponse<User>> {
        return this.httpService.patch(`https://dummyjson.com/users/${id}`,
            {
                body,
            }).pipe(map((resp) => resp.data))
    }

    deleteUser(id: string): Observable<AxiosResponse<User>> {
        return this.httpService.delete(`https://dummyjson.com/users/${id}`).pipe(map((resp) => resp.data))
    }
}

