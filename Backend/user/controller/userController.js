import { findTheUserProtofoli, getUser, removeSkills, updateTheUser } from "../service/userService.js";



// get user data
export const getUserData=async(req,res)=>{
    try{
        const id=req.user.id;
        const response=await getUser(id);
       return res.status(response.status).json(response);

    }catch(err){
        return res.status(500).json({message:err.message,success:false})
    }

}
// update user
export const update=async(req,res)=>{
       try{
        const id=req.user.id;
        const body=req.body
        const response=await updateTheUser(id,body);
       return res.status(response.status).json(response);

    }catch(err){
        return res.status(500).json({message:err.message,success:false})
    }


}
// get data of user portofoli
export const getProtofoli=async(req,res)=>{
    try{
       const response=await findTheUserProtofoli();
       return res.status(response.status).json(response);
    }catch(err){
        return res.status(500).json({success:false,message:err.message});
    }
}

// remove skills user
export const removeTheSkills=async(req,res)=>{
    try{
        const userId=req.user.id;
        const {skills}=req.body;
        const response=await removeSkills(userId,skills);
        return res.status(response.status).json(response);

    }catch(err){
        return res.status(500).json({success:true,message:err.message});
    }
}