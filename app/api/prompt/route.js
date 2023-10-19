import Prompt from '@models/prompt';
import { connectToDB } from '@utils/db'

export const GET = async () => {
  try {
    await connectToDB();
    // const prompts = await Prompt.find({}).populate('creator').aggregate([
    //   {
    //     $lookup: {
    //       from: 'like',
    //       localField: '_id',
    //       foreignField: 'prompt',
    //       as: 'likes',
    //     },
    //   },
    //   {
    //     $addFields: {
    //       likeCount: { $size: '$likes' },
    //     },
    //   },
    //   {
    //     $project: {
    //       likes: 0,
    //     },
    //   },
    // ]);

    // const prompts = await Prompt.find({})
    //   .populate('creator')
    //   .exec();

    // const aggregatedPrompts = await Prompt.aggregate([
    //   {
    //     $lookup: {
    //       from: 'likes',
    //       localField: '_id',
    //       foreignField: 'prompt',
    //       as: 'likes',
    //     },
    //   },
    //   {
    //     $addFields: {
    //       likeCount: { $size: '$likes' },
    //     },
    //   },
    //   {
    //     $project: {
    //       likes: 0,
    //     },
    //   },
    // ]);

    // const combinedPrompts = prompts.map((prompt) => {
    //   const aggregatedPrompt = aggregatedPrompts.find((ap) => ap._id.equals(prompt._id));
    //   if (aggregatedPrompt) {
    //     return { ...prompt.toObject(), likeCount: aggregatedPrompt.likeCount };
    //   }
    //   return prompt.toObject();
    // });

    const prompts = await Prompt.aggregate([
      {
        $lookup: {
          from: 'likes',
          localField: '_id',
          foreignField: 'prompt',
          as: 'likes',
        },
      },
      {
        $addFields: {
          likeCount: { $size: '$likes' },
        },
      },
      {
        $project: {
          likes: 0,
        },
      },
      {
        $lookup: {
          from: 'users', 
          localField: 'creator',
          foreignField: '_id',
          as: 'creator',
        },
      },
      {
        $unwind: '$creator', 
      },
      {
        $project: {
          'creator.password': 0, 
        },
      },
      {
        $sort: { likeCount: -1 }
      }
    ]);

    return new Response(JSON.stringify(prompts), { status: 200 })
  } catch (error) {
    return new Response("Failed to fetch prompts", { status: 500 })
  }
}

export const DELETE = async (request, { params }) => {
  try {

    await connectToDB();
    await Prompt.findByIdAndRemove(params.id);
    return new Response("Prompt deleted successfully", { status: 500 });

  } catch (error) {

    return new Response("Error deleting", { status: 500 });

  }
}

export const PATCH = async (request, { params }) => {

  const { prompt, tag } = await request.json();

  try {
    await connectToDB();
    const existingPrompt = await Prompt.findById(params.id);
    if (!existingPrompt) {
      return new Response("Prompt not found", { status: 404 });
    }
    existingPrompt.prompt = prompt;
    existingPrompt.tag = tag;
    await existingPrompt.save();
    return new Response("successfully updated", { status: 200 });

  } catch (error) {

    return new Response("Error updating", { status: 500 });

  }
}