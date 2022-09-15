import { AuthData, UserData } from "../interfaces/authInterface";
import { users } from "@prisma/client";
import * as authRepository from '../repositories/authRepository';
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config();



export async function createUser(userData: AuthData){
    const encryptedPassword = bcrypt.hashSync(userData.password, 10);
    const user = await authRepository.findByEmail(userData.email);
    if(user) throw{type: "conflict", message: "This user already exists"}

    if(userData.password !== userData.confirmPassword) throw{type: "unauthorized", message: "Incorrect confirm password"}
    
    await authRepository.insert({
        email: userData.email,
        password: encryptedPassword
    });
}


export async function loginUser(userData: UserData){
    console.log(userData)
    const user = await authRepository.findByEmail(userData.email);
    if(!user) throw{type: "unauthorized", message: "Incorrect email or password"}
    const validatePassword = bcrypt.compareSync(userData.password, user.password);
    if(!validatePassword) throw{type: "unauthorized", message: "Incorrect email or password"}
    const secretKey: string = process.env.JWT_SECRET!;
    const token = jwt.sign(user.id.toString(), secretKey);
    return token;
}