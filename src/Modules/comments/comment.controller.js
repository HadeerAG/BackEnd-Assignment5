import { Router } from "express";
import * as CS from "./comment.service.js";


const commentRouter = Router()

//Q1
commentRouter.post("/",CS.postBulkComments);
//Q2
commentRouter.patch("/:id",CS.updateComment);
//Q3
commentRouter.post("/find-or-create", CS.findOrCreateComment);
//Q4
commentRouter.get("/search", CS.searchCommentsByWord);
//Q5
commentRouter.get("/newest/:postId", CS.getRecentComments);
//Q6
commentRouter.get("/details/:id", CS.getSpecificComment);










export default commentRouter