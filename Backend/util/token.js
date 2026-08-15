import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();


export const createAccessToken = async(payload) => {
  try {

    const secret = process.env.JWT_SECRET_ACCESS;
    if (!secret) {
      throw new Error(' JWT_SECRET is not defined in environment variables');
    }

   
   return await jwt.sign(
      payload, 
      secret, 
      {
        expiresIn: process.env.JWT_EXPIRE || '30m', 
        algorithm: 'HS256',
      }
    );

    
  } catch (error) {
    console.error(' Error creating token:', error);
    throw new Error('Failed to create token');
  }
};
export const createRefeshToken = async(payload) => {
  try {

    const secret = process.env.JWT_SECRET_RESFRESH;
    if (!secret) {
      throw new Error(' JWT_SECRET is not defined in environment variables');
    }

   
   return await jwt.sign(
      payload, 
      secret, 
      {
        expiresIn: process.env.JWT_EXPIRE || '30d', 
        algorithm: 'HS256',
      }
    );

    
  } catch (error) {
    console.error(' Error creating token:', error);
    throw new Error('Failed to create token');
  }
};

export const createTokenOTP = async(payload) => {
  try {

    const secret = process.env.JWT_SECRET_OTP;
    if (!secret) {
      throw new Error(' JWT_SECRET is not defined in environment variables');
    }

   
   return await jwt.sign(
      payload, 
      secret, 
      {
        expiresIn: process.env.JWT_EXPIRE || '10m', 
        algorithm: 'HS256',
      }
    );

    
  } catch (error) {
    console.error(' Error creating token:', error);
    throw new Error('Failed to create token');
  }
};


export const verifyToken = (token,tokenSecret) => {
  try {
   
    const secret = tokenSecret;
    if (!secret) {
      throw new Error(' JWT_SECRET is not defined in environment variables');
    }

   
    const decoded = jwt.verify(token, secret);

   
    if (!decoded.id || !decoded.role) {
      throw new Error(' Invalid token payload');
    }

    return decoded;
  } catch (error) {
   
    if (error.name === 'TokenExpiredError') {
      throw new Error(' Token has expired');
    }
    if (error.name === 'JsonWebTokenError') {
      throw new Error(' Invalid token');
    }
    throw new Error(` Token verification failed: ${error.message}`);
  }
};


export const verifyTokenWithDetails = (token) => {
  try {
    const decoded = verifyToken(token);
    return {
      valid: true,
      payload: decoded,
    };
  } catch (error) {
    return {
      valid: false,
      error: error.message,
    };
  }
};


export const decodeToken = (token) => {
  try {
    const decoded = jwt.decode(token);
    if (!decoded || !decoded.id || !decoded.email || !decoded.role) {
      return null;
    }
    return decoded;
  } catch (error) {
    console.error(' Error decoding token:', error);
    return null;
  }
};


export const isTokenValid = (token) => {
  try {
    verifyToken(token);
    return true;
  } catch (error) {
    return false;
  }
};


export const getTokenRemainingTime = (token) => {
  try {
    const decoded = jwt.decode(token);
    if (!decoded || !decoded.exp) {
      return null;
    }
    
    const currentTime = Math.floor(Date.now() / 1000);
    const remainingTime = decoded.exp - currentTime;
    
    return remainingTime > 0 ? remainingTime : 0;
  } catch (error) {
    console.error(' Error getting token remaining time:', error);
    return null;
  }
};


export const refreshToken = (token) => {
  try {

    const decoded = verifyToken(token);
    
    
    const newToken = createToken({
      id: decoded.id,
      email: decoded.email,
      role: decoded.role,
    });
    
    return newToken;
  } catch (error) {
    console.error('Error refreshing token:', error);
    throw new Error('Failed to refresh token');
  }
};