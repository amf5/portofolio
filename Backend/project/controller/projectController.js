import { createTheProject, deleteTheProject, getAllProjects, getProject, removeLanguageANDFramework, updateTheProject } from "../service/projectService.js";



// get project by id
export const getTheProject=async(req,res)=>{
    try{
        const {projectId}=req.params;
        const response=await getProject(projectId);
        return res.status(response.status).json(response)

    }catch(err){
        return {status:500,message:err.message,success:false}
    }
}
// get All projects
export const getProjects=async(req,res)=>{
    try{
   const { page, limit } = req.query;
   const pageNumber = Number(page) || 1;
   const limitNumber = Number(limit) || 10;
   const response=await getAllProjects(pageNumber,limitNumber);
   return res.status(response.status).json(response);
    }catch(err){
        return res.status(500).json({message:err.message,success:false})
    }

}
// delete project
export const deleteThePro=async(req,res)=>{
    try{
       const userId=req.user.id;
       const projectId=req.params.projectId;
        const response=await deleteTheProject(projectId,userId);
        return res.status(response.status).json(response);
    }catch(err){
        return res.status(500).json({message:err.message,success:false})
    }
}
// create project
export const create=async(req,res)=>{
    try{
        const userId=req.user.id;
        const created=req.body;
        const response=await createTheProject(userId,created);
        return res.status(response.status).json(response);

    }catch(err){
        return res.status(500).json({message:err.message,success:false});
    }
}
// update project
export const update=async(req,res)=>{
    try{
        const userId=req.user.id;
        const projectId=req.params.projectId;
        console.log(projectId)
        const updated=req.body;
        const response=await updateTheProject(projectId,userId,updated);
        return res.status(response.status).json(response);

    }catch(err){
        return res.status(500).json({message:err.message,success:false})
    }
}
// remove project language and framework
export const remove=async(req,res)=>{
    try{
     const userId=req.user.id;
        const projectId=req.params.projectId;
        const updated=req.body;
        const response =await removeLanguageANDFramework(projectId,
            userId,updated
        )

 return res.status(response.status).json(response);
    }catch(err){
        return res.status(500).json({message:err.message,success:false})
    }
} 