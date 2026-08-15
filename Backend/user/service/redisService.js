
import redisClient from '../../config/redis.js';


export const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};


export const saveOTP = async (email, otpCode) => {
  try {

    const key = `otp:${email.toLowerCase()}`;
    

    await redisClient.setEx(key, 300, otpCode);
    
    console.log(` OTP saved for ${email}: ${otpCode}`);
    return true;
  } catch (error) {
    console.error(' Error saving OTP:', error);
    return false;
  }
};


export const getOTP = async (email) => {
  try {
    const key = `otp:${email.toLowerCase()}`;
    const otpCode = await redisClient.get(key);
    
    if (!otpCode) {
      return null;
    }
    
    return otpCode;
  } catch (error) {
    console.error(' Error getting OTP:', error);
    return null;
  }
};


export const deleteOTP = async (email) => {
  try {
    const key = `otp:${email.toLowerCase()}`;
    const result = await redisClient.del(key);
    
    if (result === 1) {
      console.log(` OTP deleted for ${email}`);
      return true;
    } else {
      console.log(` No OTP found for ${email}`);
      return false;
    }
  } catch (error) {
    console.error(' Error deleting OTP:', error);
    return false;
  }
};
