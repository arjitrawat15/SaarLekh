import bcrypt from 'bcrypt';
import User from '@/models/user';
import connectToDatabase from '@/lib/mongodb';

export async function POST(req) {
    const { email, password } = await req.json();

    try {
        await connectToDatabase();

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return new Response(JSON.stringify({ error: 'User already exists' }), { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ email, password: hashedPassword });

        await user.save();

        return new Response(JSON.stringify({ message: 'User registered successfully' }), { status: 201 });
    }
    catch (error) {
        console.error('Error registering user:', error);
        return new Response(JSON.stringify({ error: 'Something went wrong' }), { status: 500 });
    }
}