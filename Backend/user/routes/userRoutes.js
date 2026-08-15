import express  from "express";
import { authenticateToken } from "../../middlewares/protect.js";
import { getProtofoli, getUserData, removeTheSkills, update } from "../controller/userController.js";




const UserRouter=express.Router();

UserRouter.get("/user-data",authenticateToken,getUserData);
UserRouter.get("/user-portofoli",getProtofoli);
UserRouter.patch("/user-update",authenticateToken,update)
UserRouter.patch("/user-remove-skills",authenticateToken,removeTheSkills);

export default UserRouter;