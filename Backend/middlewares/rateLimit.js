// middleware/rateLimiter.js
import rateLimit from 'express-rate-limit';

// 📌 General protection for all API endpoints
// Limits each IP to 100 requests per 15 minutes
export const generalLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, 
  max: 100, 
  message: {
    success: false,
    message: '⚠️ Too many requests, please try again later.',
  },
  standardHeaders: true, 
  legacyHeaders: false, 
  skipSuccessfulRequests: false, 
});

// 📌 Stricter protection for login endpoints
// Prevents brute force attacks - only 5 attempts per 15 minutes
export const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Only 5 login attempts allowed
  message: {
    success: false,
    message: '⚠️ Too many login attempts, please try again after 15 minutes.',
  },
  standardHeaders: true,
  legacyHeaders: false,
  skipSuccessfulRequests: true, // Don't count successful logins
});

// 📌 Protection for registration endpoints
// Prevents mass account creation - only 3 attempts per hour
export const registerLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 3, // Only 3 registration attempts per hour
  message: {
    success: false,
    message: '⚠️ Too many registration attempts, please try again later.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// 📌 Protection for payment endpoints
// Prevents payment abuse - only 10 attempts per hour
export const paymentLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 10, // Only 10 payment attempts per hour
  message: {
    success: false,
    message: '⚠️ Too many payment attempts, please try again later.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// 📌 Protection for file upload endpoints
// Prevents server overload - only 20 uploads per hour
export const uploadLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 20, // Only 20 uploads per hour
  message: {
    success: false,
    message: '⚠️ Too many uploads, please try again later.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// 📌 Protection for search endpoints
// Prevents heavy query abuse - only 30 searches per minute
export const searchLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 30, // Only 30 search requests per minute
  message: {
    success: false,
    message: '⚠️ Too many search requests, please slow down.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// 📌 Protection for admin endpoints
// Restricts high-privilege access - only 50 requests per hour
export const adminLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 50, // Only 50 admin requests per hour
  message: {
    success: false,
    message: '⚠️ Too many admin requests, please try again later.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// 📌 Custom limiter factory
// Creates a rate limiter with custom settings
export const createCustomLimiter = (windowMs, max, message) => {
  return rateLimit({
    windowMs,
    max,
    message: {
      success: false,
      message: message || '⚠️ Too many requests, please try again later.',
    },
    standardHeaders: true,
    legacyHeaders: false,
    // Use user ID if logged in, otherwise use IP address
    keyGenerator: (req) => {
      return req.user?.id || req.ip;
    },
  });
};

// 📌 Rate limiter with skip functionality
// Ignores rate limiting for specific IP addresses
export const limiterWithSkip = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Maximum 100 requests per IP
  message: {
    success: false,
    message: '⚠️ Too many requests, please try again later.',
  },
  standardHeaders: true,
  legacyHeaders: false,
  skip: (req) => {
    // Skip rate limiting for specific IP addresses (e.g., internal servers)
    const skipIPs = ['127.0.0.1', '::1', '192.168.1.100'];
    return skipIPs.includes(req.ip);
  },
});

// 📌 Rate limiter with custom handler
// Custom response when rate limit is exceeded
export const customHandlerLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Maximum 100 requests per IP
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    // Custom response when rate limit is exceeded
    res.status(429).json({
      success: false,
      message: '⚠️ Too many requests, please try again later.',
      retryAfter: Math.ceil(15 * 60), // Seconds until reset
    });
  },
});

// Export all limiters as a single object
export default {
  generalLimiter,
  loginLimiter,
  registerLimiter,
  paymentLimiter,
  uploadLimiter,
  searchLimiter,
  adminLimiter,
  createCustomLimiter,
  limiterWithSkip,
  customHandlerLimiter,
};


export const userRateLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 3, // Maximum 3 requests per user
  message: {
    success: false,
    message: '⚠️ You have exceeded the limit of 3 requests per hour. Please try again later.',
  },
  standardHeaders: true, // Return rate limit info in headers
  legacyHeaders: false, // Disable legacy headers
  
  // 🔑 IMPORTANT: Use user ID to track each user separately
  keyGenerator: (req) => {
    // Use user ID if authenticated, otherwise use IP
    return req.user?.id || req.ip;
  },
  
  // Optional: Skip counting for specific cases
  skip: (req) => {
    // Skip for admin users (if you want)
    return req.user?.role === 'admin';
  },
  
  // Optional: Custom handler when limit is exceeded
  handler: (req, res) => {
    res.status(429).json({
      success: false,
      message: '⚠️ You have exceeded the limit of 3 requests per hour. Please try again later.',
      retryAfter: Math.ceil(60 * 60), // 1 hour in seconds
    });
  },
});

