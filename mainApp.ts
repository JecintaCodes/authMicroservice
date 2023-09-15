import express, { Application } from "express"
import cors from "cors"
import userRouter from "./router/userRouter"

export const mainApp = (app:Application) =>{
    app.use(express.json())
    app.use(cors())
    app.use("/api/v1",userRouter)
    app.get("/")
}