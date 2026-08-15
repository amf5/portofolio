import { verifyToken } from '../util/token.js';
import User from '../user/model/User.js';
import { findUserById } from '../user/repository/userRepositoty.js';
import "dotenv/config.js"

export const authenticateToken = async (req, res, next) => {
  try {
   
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; 

    if (!token) {
      return res.status(401).json({
        success: false,
        message: ' Access denied. No token provided.',
      });
    }

    
    const decoded = verifyToken(token,process.env.JWT_SECRET_ACCESS);
    
 
    const user = await findUserById(decoded.id);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: ' User not found',
      });
    }

    
      req.user = {
      id: decoded.id,
      role: decoded.role,
    };

    req.user = user;
    next();
    
  } catch (error) {
   
    if (error.message.includes('expired')) {
      return res.status(401).json({
        success: false,
        message: ' Token has expired. Please login again.',
      });
    }
    
    if (error.message.includes('Invalid token')) {
      return res.status(403).json({
        success: false,
        message: ' Invalid token',
      });
    }

    return res.status(403).json({
      success: false,
      message: error.message || ' Invalid or expired token',
    });
  }
};


export const isAdmin = (req, res, next) => {

  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: ' Unauthorized',
    });
  }

  if (req.user.role !== 'admin' && req.user.role !== 'superadmin') {
    return res.status(403).json({
      success: false,
      message: ' Access denied. Admin only.',
    });
  }

  next();
};


export const isSuperAdmin = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: ' Unauthorized',
    });
  }

  if (req.user.role !== 'superadmin') {
    return res.status(403).json({
      success: false,
      message: ' Access denied. Super Admin only.',
    });
  }

  next();
};
