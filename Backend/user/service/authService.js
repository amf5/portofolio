

import "dotenv/config.js"
import { createAccessToken, createRefeshToken,  createTokenOTP, verifyToken } from "../../util/token.js";
import { createUser, findUser, findUserByEmail, findUserById } from "../repository/userRepositoty.js"
import { sendEmail } from "./emailService.js";
import { deleteOTP, generateOTP, getOTP, saveOTP } from "./redisService.js";
import { createToken, deleteTokenByUserId, findTokenbyRefreshToken, findTokenByUserId } from "../../Auth/repository/tokenRepository.js";


//login
export const login=async(email,password)=>{
    const user= await findUserByEmail(email);
    if(!user)return {status:404,success:false,message:"user not found"}
     const isMatch = await user.comparePassword(password);
    if(!isMatch)return{status:401,message:"Bad credentials",success:false}
    const accessToken=await createAccessToken({id:user._id,role:user.role});
    const refreshToken=await createRefeshToken({id:user._id,role:user.role});
    user.lastLogin=new Date();
    await user.save();
    await createToken(user._id,refreshToken);
    return {status:200,message:"successfully login",data:{accessToken,refreshToken,id:user._id}};


}
//sign up
export const Register=async(name,email ,password)=>{
    const user=await findUserByEmail(email);
    if(user){
        if(user.isVerified)
            return {status:401,message:"there is account by this email user another email or go login by this Email",success:false}
        }
       const otp=generateOTP();
       console.log(otp);
       const createdUser= await createUser(name,email,password);
      
       await sendEmail(email,`enter this code to activate account`,otp);
       await saveOTP(email,otp);
   
       return {status:201,message:"successfully register check your Email now to activate your account",success:true};

}
// Activate your acount
export const activateAccount=async(email,otp)=>{
    const user =await findUserByEmail(email);
    if(!user)return {status:404,message:"user not found",success:false};
    const savedOtp=await getOTP(email);
    if(!otp)return {status:422,message:"enter the code or put resend code to get another code",success:false}
    if(!savedOtp)return {status:403,message:" resend another code",success:false};
    if(savedOtp===otp){
    user.isVerified=true;
    await user.save();
    await deleteOTP(email);
    const accessToken=await createAccessToken({id:user._id,role:user.role});
    const refreshToken= await createRefeshToken({id:user._id,role:user.role});
    await createToken(user._id,refreshToken);
    return {status:200,message:"successfully",success:true,data:{id:user._id,accessToken,refreshToken}}
    
    }
    return {status:400,message:"invalid code",success:false};
}
//resend another code
export const resendCode=async(email)=>{
    const user =await findUserByEmail(email);
    if(!user)return {status:403,message:"there is not account by this email go and sign up ",success:false}
    const savedOTP=await getOTP(email);
    console.log(savedOTP)
   if (!savedOTP) {
     return {
    status: 403,
    message: "Forbidden"
  };
    }
    const otp=generateOTP();
    await saveOTP(email,otp);
    await sendEmail(email,`enter this code:`,otp);
    return {status:200,message:"successfully resend check email",success:true}
}
// sent tokenotp after forget password
export const sendTokenOTP=async(email,otp)=>{
const user =await findUserByEmail(email);
if(!user)return {status:404,message:"user not found",success:false};
const savedOtp=await getOTP(email);
    if(!otp)return {status:422,message:"enter the code or put resend code to get another code",success:false}
    if(!savedOtp)return {status:403,message:"put resend another code",success:false};
    if(savedOtp===otp){
     const token =await createTokenOTP({id:user._id,role:user.role});
     return {status:200,message:"successfully",token}
    }
   return {status:400,message:"invalid code",success:false};
}

// forgot password
export const forgotPassword=async(email)=>{
    const user =await findUserByEmail(email);
    if(!user)return {status:404,message:"user not found",success:false}
    const otp = generateOTP();
    await saveOTP(email,otp);
    await sendEmail(email,`enter this code to confirm change password`,otp);
    await deleteTokenByUserId(user._id);
    return  {status:200,message:"successfully",success:true};
}
// get access token
export const getAccessToken=async(refreshToken)=>{
    const token =await findTokenbyRefreshToken(refreshToken);
    if(!token)return {status:404,message:"refresh token not found",success:false};
    const decoded=verifyToken(refreshToken,process.env.JWT_SECRET_RESFRESH);
    if(!decoded)return {status:400,message:"invalid token",success:false};
    const accessToken=await createAccessToken({id:decoded.id,role:decoded.role});
    return {status:200,message:"successfully",accessToken,success:true};
}
// logout
export const logout=async(userId)=>{
    const token =await deleteTokenByUserId(userId);
    if(!token)return {status:404,message:"token not found",success:false}
    return {status:200,message:"logout successfully",success:true}

}
// confirm  old password 
export const confirmOldPassword=async(userId,oldPassword)=>{
    const user=await findUser(userId);
    if(!user)return {status:404,message:"user not found",success:false}
     const isMatch=await user.comparePassword(oldPassword);
      await deleteTokenByUserId(userId);
    if(!isMatch){
       return{status:401,message:"Bad credentials",success:false}}
    const token =await createTokenOTP({id:user._id,role:user.role});
     return {status:200,message:"successfully",token}


}
// change password
export const changePassword=async(userId,newPassword)=>{
    const user=await findUserById(userId);
    if(!user)return{status:404,message:"user not found",success:false}
   if (!newPassword) return {status:422,message:"please enter new password",success:false}
    user.password=newPassword;
    await user.save();
    const accessToken=await createAccessToken({id:user._id,role:user.role});
    const refreshToken=await createRefeshToken({id:user._id,role:user.role});
    await createToken(user._id,refreshToken)
    return{status:200,message:"successfully changed Password",success:true,data:{accessToken,refreshToken,id:user._id}};
}