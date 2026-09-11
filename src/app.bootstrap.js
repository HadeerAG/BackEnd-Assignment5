import express from "express";
import { connectionDB, syncDB } from "./DB/connectionDB.js";
import userRouter from "./Modules/users/user.controller.js";
import postRouter from "./Modules/posts/post.controler.js";
import commentRouter from "./Modules/comments/comment.controller.js";

const app = express();
const port = 3000;

const bootsrap = async ()=>{
    app.use(express.json());
    app.get("/",(req,res,next)=> res.status(200).json({message:"Hello world"}))


     await connectionDB()
     await syncDB({ alter: true });

     app.use("/user", userRouter);
     app.use("/post", postRouter);
     app.use("/comment", commentRouter);
    
    
    app.use("{/*demo}",(req,res,next)=>{
        res.status(404).json({
            message:`Url:${req.originalUrl} with method ${req.method} not found`,
            statusCode: 404
        })
    })
    
    app.listen(port,()=>console.log(`server is running on port ${port}`)
    )
}

export default bootsrap