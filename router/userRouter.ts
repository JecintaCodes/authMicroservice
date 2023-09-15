import {Router} from "express"
import { deleteUser, getAllUser, getOneUser, registerUser, signInUser, updateUser } from "../controller/userController";

const userRouter = Router();

userRouter.route("/register").post(registerUser)
userRouter.route("/sign-in").post(signInUser)
userRouter.route("/get-all").get(getAllUser)
userRouter.route("/:userID/get-one").get(getOneUser)
userRouter.route("/:userID/update").patch(updateUser)
userRouter.route("/:userID/delete-user").delete(deleteUser)

export default userRouter