import { IsEmail, IsEnum, IsNotEmpty, IsString, } from "class-validator";


export class CreateUserDto {
    @IsNotEmpty()
    @IsString({ message: "Name must be string" })
    name: string; 

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsEnum(["intern", "admin", "engineer"], {
        message: "Valid role required"
    })
    role: "intern" | "admin" | "engineer";

}