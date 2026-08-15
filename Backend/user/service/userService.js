import { createUser, findUserById, findUserProtofoli, removeUserSkills, updateUser } from "../repository/userRepositoty.js"

// get user 
export const getUser=async(userId)=>{
    const user=await findUserById(userId);
    if(!user)return{status:404,message:"user not found",success:false}
    return {status:200,message:"successfully",data:user, success:true}
}
// create user 
export const createTheUser=async(name,email, password)=>{
await createUser(name,email,password);
return {status:201,message:"created successfully"}


}
// update user
export const updateTheUser=async(userId,updatedUser)=>{
    const user =await updateUser(userId,updatedUser);
    if(!user)return {status:404,message:"user not found",success:false}
    return {status:200,message:"updated successfully",success:true}
}
// find user data portofoli
export const findTheUserProtofoli=async()=>{
    const user=await findUserProtofoli();
    if(!user)return {status:404,message:"no data to show",success:true}
    return {status:200,message:"successfully",success:true,data:user}
}
// remove skills 
export const removeSkills=async(userId,skills)=>{
    const user=await removeUserSkills(userId,skills);
    if(!user)return {status:404,message:"user not found",success:false};
    return {status:200,message:"successfully remove",success:true,data:user};

}