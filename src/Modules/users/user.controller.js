import { Router } from "express";
import * as US from "./user.service.js";

const userRouter = Router()

userRouter.post("/",US.createUser)
userRouter.put("/:id",US.UpdateUser)
userRouter.get("/",US.findUser);
userRouter.get("/:id",US.findUserByPK);









export default userRouter