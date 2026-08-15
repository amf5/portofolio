import express from "express";
import { authenticateToken } from "../../middlewares/protect.js";
import { create, deleteThePro, getProjects, getTheProject, remove, update } from "../controller/projectController.js";

const ProjectRouter=express.Router();

ProjectRouter.post("/project-create",authenticateToken,create);
ProjectRouter.patch("/project-update/:projectId",authenticateToken,update);
ProjectRouter.patch("/project-remove/:projectId",authenticateToken,remove);
ProjectRouter.delete("/project-delete/:projectId",authenticateToken,deleteThePro);
ProjectRouter.get("/project-all",getProjects);
ProjectRouter.get("/project/:projectId",getTheProject);




export default ProjectRouter;