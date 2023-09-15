import express, { Application } from "express"
import { mainApp } from "./mainApp"
import env from "dotenv"
env.config()

const realPort:number = parseFloat(process.env.PORT_NUMBER!)

const port: number = realPort
const app:Application = express()

mainApp(app)

const server = app.listen(port, ()=>{
    console.log(`server is live on port: ${port}`)
})

process.on("uncaughtException", (error: any)=>{
    console.log("server is shutting down due to uncaughtException ")
    console.log("uncaughtException", error)
})

process.on("unhandleRejection", (error: any)=>{
    console.log("server is shutting down due to unhandleRejection ")
    console.log("unhandleRejection", error)
})