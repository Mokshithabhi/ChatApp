const express = require("express");
import authRouter from './Routes/auth'
import messagesRouter from './Routes/messages'
import userRouter from './Routes/user'
import ConnectMongoDB from "./Db/connection";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { app,server } from "./Socket/socket";

const cors = require("cors");

const PORT = process.env.PORT ?? '4000';

dotenv.config();

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use('/api/auth',authRouter)
app.use('/api/messages',messagesRouter)
app.use("/api/users", userRouter);

// const server = createServer(app)
// const io = new Server(server,{cors:{
//     origin:"http://localhost:5173",
//     methods:["GET","POST"],
//     credentials:true,
// }})

// io.on("connect",(clients:Socket)=>{
//     console.log("user Connected")
//     console.log("id",clients.id)
//     clients.broadcast.emit('welcome',`welcome to the server:${clients.id}`)
//     clients.on("disconnect",()=>console.log(`user Disconnected :${clients?.id}`))
// })

server.listen(PORT,()=>{
    ConnectMongoDB();
    console.log('connected')
})