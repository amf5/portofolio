import express from "express";
import { Activate, changeThePassword, confirmTheOldPassword, forgotThePassword, getTheAccesssToken, resendTheCode, sendTheTokenOTP, signUp, theLogin, theLogout } from "../controller/authController.js";
import { authenticateToken } from "../../middlewares/protect.js";
import { authenticateTokenOTP } from "../../middlewares/protectTokenOTP.js";
import { generalLimiter } from "../../middlewares/rateLimit.js";


const AuthRouter=express.Router();

AuthRouter.post("/login",theLogin);
//AuthRouter.post("/signup",signUp);
//AuthRouter.post("/activate",Activate);
AuthRouter.post("/resend-code",generalLimiter,resendTheCode);
AuthRouter.post("/send-token-otp",generalLimiter,sendTheTokenOTP);
AuthRouter.post("/forgot-password",forgotThePassword);
AuthRouter.post("/access-token", getTheAccesssToken);
AuthRouter.post("/logout",authenticateToken,theLogout);
AuthRouter.post("/confirm-Password",authenticateToken,confirmTheOldPassword);
AuthRouter.patch("/change-Password",authenticateTokenOTP,changeThePassword);

export default AuthRouter;