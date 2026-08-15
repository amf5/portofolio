
import { createClient } from 'redis';
import dotenv from 'dotenv';

dotenv.config();


const redisClient = createClient({
  url: process.env.REDIS_URL || 'redis://localhost:6379',
  
});


redisClient.on('connect', () => {
  console.log('✅ Redis connected successfully');
});


redisClient.on('error', (error) => {
  console.error('❌ Redis connection error:', error);
});


redisClient.on('end', () => {
  console.log('📡 Redis disconnected');
});


await redisClient.connect();

export default redisClient;