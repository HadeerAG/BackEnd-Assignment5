import { Router } from "express";
import * as Post from "./post.service.js";


const postRouter = Router()

postRouter.post("/",Post.createPost)
//Q2
postRouter.delete("/:postId",Post.deletePost);
//Q3
postRouter.get("/",Post.findPost);
//Q4
postRouter.get("/comment-count",Post.getAllPostsWithCommentCount);









export default postRouter