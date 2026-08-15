
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import connectDB from './config/dataBase.js';
import UserRouter from './user/routes/userRoutes.js';
import AuthRouter from './user/routes/AuthRoutes.js';
import ProjectRouter from './project/routes/projectRoutes.js';


dotenv.config();


const app = express();
const PORT = process.env.PORT || 3000;


const startServer = async () => {
  try {
    console.log('🔄 Connecting to database...');
    

    await connectDB();
    console.log('✅ Database connected successfully');

   
    app.use(helmet());
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(UserRouter);
    app.use(AuthRouter);
    app.use(ProjectRouter);


    app.get('/', (req, res) => {
      res.json({
        success: true,
        message: '🚀 Server is running!',
        timestamp: new Date().toISOString(),
      });
    });

  

   
    app.listen(PORT, () => {
      console.log(`✅ Server running on http://localhost:${PORT}`);
      console.log(`🔍 Environment: ${process.env.NODE_ENV || 'development'}`);
      console.log(`🛡️  Helmet is active`);
    });

  } catch (error) {
    console.error(`❌ Failed to start server: ${error.message}`);
    console.error('⚠️ Server will not start because database is not connected');
    process.exit(1);
  }
};

startServer();

process.on('unhandledRejection', (reason, promise) => {
  console.error('💥 Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

process.on('uncaughtException', (error) => {
  console.error('💥 Uncaught Exception:', error);
  process.exit(1);
});

export default app;