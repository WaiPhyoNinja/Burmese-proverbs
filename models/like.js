import { Schema, model, models } from 'mongoose'

const LikeSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  prompt: {
    type: Schema.Types.ObjectId,
    ref: 'Prompt',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

const Like = models.like || model('like', LikeSchema);

export default Like;
