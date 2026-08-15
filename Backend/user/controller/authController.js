import { activateAccount, changePassword, confirmOldPassword, forgotPassword, getAccessToken, login, logout, Register, resendCode, sendTokenOTP } from "../service/authService.js";


// login 
export const theLogin=async(req,res)=>{
    try{
        const {email,password}=req.body;
        const response=await login(email,password);
        return res.status(response.status).json(response);
        }catch(err){
        return res.status(500).json({message:err.message,success:false})
    }
}
// register
export const signUp = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const response = await Register(name, email, password);
        return res.status(response.status).json(response);
    } catch (err) {
        return res.status(500).json({ message: err.message, success: false });
    }
}
// activate account
export const Activate=async(req,res)=>{
    try{
      const{email,code}=req.body;
      const response=await activateAccount(email,code);
       return res.status(response.status).json(response); 

    }catch(err){
         return res.status(500).json({message:err.message,success:false})  
    }
}
// resend the code
export const resendTheCode=async(req,res)=>{
    try{
      const{email}=req.body;
      const response=await resendCode(email);
       return res.status(response.status).json(response); 

    }catch(err){
         return res.status(500).json({message:err.message,success:false})  
    }
}
//send thetokenOTP
export const sendTheTokenOTP=async(req,res)=>{
    try{
      const{email,code}=req.body;
      const response=await sendTokenOTP(email,code);
       return res.status(response.status).json(response); 

    }catch(err){
         return res.status(500).json({message:err.message,success:false})  
    }
}
// forgot the Password
export const forgotThePassword=async(req,res)=>{
    try{
      const{email}=req.body;
      const response=await forgotPassword(email);
       return res.status(response.status).json(response); 

    }catch(err){
         return res.status(500).json({message:err.message,success:false})  
    }
}
// get access Token
export const getTheAccesssToken=async(req,res)=>{
    try{
      const{refreshToken}=req.body;
      const response=await getAccessToken(refreshToken);
       return res.status(response.status).json(response); 

    }catch(err){
         return res.status(500).json({message:err.message,success:false})  
    }
}
// logout
export const theLogout=async(req,res)=>{
    try{
      const id=req.user.id;
      const response=await logout(id);
       return res.status(response.status).json(response); 

    }catch(err){
         return res.status(500).json({message:err.message,success:false})  
    }
}
// confirm the old password
export const confirmTheOldPassword=async(req,res)=>{
    try{
    const id=req.user.id;
      const{password}=req.body;
      const response=await confirmOldPassword(id,password);
       return res.status(response.status).json(response); 

    }catch(err){
         return res.status(500).json({message:err.message,success:false})  
    }
}
// change password
export const changeThePassword=async(req,res)=>{
    try{
      const id=req.user.id;
      const{password}=req.body;
      const response=await changePassword(id,password);
       return res.status(response.status).json(response); 

    }catch(err){
         return res.status(500).json({message:err.message,success:false})  
    }
}