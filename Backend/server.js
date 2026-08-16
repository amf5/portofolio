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

const PORT = process.env.PORT || 3000;


if (process.env.NODE_ENV !== 'production') {
  const startServer = async () => {
    try {
      console.log('🔄 Connecting to database...');

      await connectDB();

      console.log('✅ Database connected successfully');

      app.listen(PORT, () => {
        console.log(`✅ Server running on http://localhost:${PORT}`);
      });

    } catch (error) {
      console.error(`❌ Failed to start server: ${error.message}`);
      process.exit(1);
    }
  };

  startServer();
}

export default app;