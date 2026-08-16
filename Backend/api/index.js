import app from '../server.js';
import connectDB from '../config/dataBase.js';

await connectDB();

export default app;