// biome-ignore lint/complexity/noUselessLoneBlockStatements: <explanation>
{
    /* import NextAuth from "next-auth";


import { authOptions } from "~/server/auth";


// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
*/
}
/*
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";


const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: {
                    label: "Email",
                    type: "email",
                    placeholder: "example@example.com",
                },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                // This is where you would typically query your database
                // For this example, we'll use a mock authentication
                if (
                    credentials?.email === "user@example.com" &&
                    credentials?.password === "password"
                ) {
                    return { id: "1", name: "John Doe", email: "user@example.com" };
                    // biome-ignore lint/style/noUselessElse: <explanation>
                } else {
                    return null;
                }
            },
        }),
    ],
    pages: {
        signIn: "/sign-in",
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.id as string;
            }
            return session;
        },
    },
});


export { handler as GET, handler as POST };
*/
import NextAuth from "next-auth";


import { authOptions } from "~/server/auth";


// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const handler = NextAuth(authOptions);


export { handler as GET, handler as POST };



