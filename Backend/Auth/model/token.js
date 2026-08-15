import mongoose from 'mongoose';

const tokenSchema = new mongoose.Schema({
  
  refreshToken: {
    type: String,
    required: true,
  },
  
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },


  createdAt: {
    type: Date,
    default: Date.now,
    expires: 2592000, 
  },

}, {
  timestamps: true, 
});

const Token = mongoose.model('Token', tokenSchema);

export default Token;