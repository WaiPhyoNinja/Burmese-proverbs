import {Schema, model, models }  from 'mongoose'

const PromptSchema = new Schema({
    creator: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    prompt: {
      type: String,
      required: [true, 'Please enter Prompt.'],
    },
    tag: {
      type: String,
      required: [true, 'Please enter Tag.'],
    }
  });
  
  const Prompt = models.Prompt || model('Prompt', PromptSchema);
  
  export default Prompt;
