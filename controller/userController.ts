import { Request, Response } from "express"
import {PrismaClient} from "@prisma/client"
import bcrypt from "bcrypt"

const prisma = new PrismaClient()

export const registerUser = async(req:Request,res:Response)=>{
    try {
        const {userName, email, password} = req.body;

        const salt = await bcrypt.genSalt(10);
        const harsh = await bcrypt.hash(password, salt)
        const ava = email.charAt(0).toUpperCase()

        const user = await prisma.authModel.create({
            data:{
                userName, 
                email,
                password: harsh,
                avatar: ava,  
                avatarID:"img",     
                }
        }) 

        return res.status(201).json({
            message:"user Registered",
            data: user
        })
        
    } catch (error) {
        return res.status(404).json({
            message: "error registering user",
            data: error
        })
    }
}

export const signInUser = async (req:Request, res:Response) =>{
    try {
        const {email, password} = req.body;

        const user = await prisma.authModel.findUnique({
            where:{email}
        })

        if (user) {
            const check = await bcrypt.compare(password, user?.password)
            if(check){
                return res.status(201).json({
                    message:`welcome back ${user.userName}`,
                    data:user.id
                })
            }else{
                return res.status(404).json({
                    message:"incorrect password"
                })
            }
            
        } else{
            return res.status(404).json({
                message: "error from email "
            })
        }
    } catch (error) {
        return res.status(404).json({
            message: "go back and register",
            data: error
        })
    }
}

export const getOneUser = async (req:Request, res:Response) =>{
    try {
        
        const {userID} = req.params;

        const user = await prisma.authModel.findUnique({
            where:{id: userID}
        })

        return res.status(200).json({
            message:"one user gotten",
            data: user
        })

    } catch (error) {
        return res.status(404).json({
            message:"error getting one users",
            data: error
        })
    }
}

export const getAllUser = async(req:Request, res:Response) =>{
    try {
        
        const user = await prisma.authModel.findMany({})

        return res.status(200).json({
            message:"gotten all users",
            data: user
        })
        
    } catch (error) {
        return res.status(404).json({
            message:"error getting all users",
            data: error
        })
    }
} 

export const updateUser = async(req:Request, res:Response) =>{
    try {
        const {userID} = req.params;
        const {userName} = req.body;

        const user = await prisma.authModel.update({
            where:{id: userID},
            data:{userName}
        })
        return res.status(201).json({
            message:"user updated",
            data: user
        })
    } catch (error) {
        return res.status(404).json({
            message:"error updating user",
            data: error
        })
    }
}

export const deleteUser = async(req:Request, res:Response) =>{
    try {

        const {userID} = req.params;

        const user = await prisma.authModel.delete({
            where: {id:userID}
        })
        
        return res.status(200).json({
            message:"deleting user successfully",
            data:user
        })
    } catch (error) {
        return res.status(404).json({
            message: "error deleting user"
        })
    }
}