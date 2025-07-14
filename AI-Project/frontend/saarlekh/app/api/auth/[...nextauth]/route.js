import NextAuth from "next-auth";
import User from "@/models/user";
import connectToDatabase from "@/lib/mongodb";
import bcrypt from "bcrypt";
import CredentialsProvider from "next-auth/providers/credentials";
import Email from "next-auth/providers/email";

const handler = NextAuth({
    session: {
        strategy: "jwt",
    },
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: {  label: "Password", type: "password" },
            },
            async authorize(credentials) {
                try {
                    await connectToDatabase();
                    const user = await User.findOne({
                        email: credentials?.email,
                    });
                    
                    if (!user) {
                        throw new Error("No user found with this email");
                    }

                    const isValidPassword = await bcrypt.compare(
                        credentials.password,
                        user.password
                    );
                    if (!isValidPassword) {
                        throw new Error("Invalid password");
                    }
                    
                    return {
                        id: user._id,
                        name: user.name,
                        email: user.email,
                        image: user.image,
                    };
                }
                catch (error) {
                    console.error("Error in authorize:", error);
                    throw new Error("Error authorizing user");
                }
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user._id;
                token.email = user.email;
            }
            return token;
        },
        async session({ session, token }) {
            if (token) {
                session.user = {
                    id: token.id,
                    email: token.email,
                    name: token.name,
                    image: token.picture,
                };
            }
            return session;
        },
    },
    pages: {
        signIn: "/login",
        newUser: "/convert",
    }, 
    secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };