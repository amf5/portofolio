import { createProject, deleteProjectByIdAndUserId, findAllProjects, findProjectById, removeFromProject, updateProject } from "../repositoty/projectRepository.js";

// create Project
export const createTheProject=async(userId,createdProject)=>{
    const project=await createProject(userId,createdProject);
    return {status:201,message:"created successfully",data:project};
}
// update project
export const updateTheProject=async(projectId,userId,updatedProject)=>{
    const project=await updateProject(projectId,userId,updatedProject);
    if(!project)return {status:404,message:"project not found",success:false}
    return {status:200,message:"updated successfully",success:true,data:project}
}
// remove language, framework
export const removeLanguageANDFramework=async(projectId,userId,updated)=>{
    const project=await removeFromProject(projectId,userId,updated)
    if(!project)return {status:404,message:"project not found",success:false}
    return {status:200,message:"removed successfully",success:true, data:project}

}
// delet project 
export const deleteTheProject=async(projectId,userId)=>{
    const project=await deleteProjectByIdAndUserId(projectId,userId);
        if(!project)return {status:404,message:"project not found",success:false}
    return {status:200,message:"deleted successfully",success:true, data:project}
}

// get project
export const getProject=async(projectId)=>{
    const project=await findProjectById(projectId);
    if(!project)return {status:404,message:"project not found",success:false}
    return {status:200,message:"successfully",success:true,data:project}
}
// get All Projects
export const getAllProjects=async(page,limit)=>{
    const projects=await findAllProjects(page,limit);
    return {status:200,message:"successfully",success:true,data:projects};

}