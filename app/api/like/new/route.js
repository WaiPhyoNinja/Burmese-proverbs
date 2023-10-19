import Like from '@models/like';
import { connectToDB } from '@utils/db'

export const POST = async (request) => {
    const { user, prompt } = await request.json();

    try {
        await connectToDB();
        const newLike = new Like({ user: user, prompt: prompt });
        await newLike.save();
        return new Response(JSON.stringify(newLike), { status: 201 })
    } catch (error) {
        return new Response("Failed to create ", { status: 500 });
    }
}
