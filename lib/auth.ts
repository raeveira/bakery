import NextAuth from "next-auth"
import authConfig from "@/lib/auth.config";
import {PrismaAdapter} from "@auth/prisma-adapter"
import {db} from "@/prisma/prismaClient"
import {getRole} from "@/app/actions/getRole";

export const {handlers, signIn, signOut, auth} = NextAuth({
    adapter: PrismaAdapter(db),
    session: {strategy: "jwt"},
    ...authConfig,
    callbacks: {
        async session({ token, session }) {
            if (token.sub && session.user) {
                session.user.id = token.sub;
            }

            if (token.role) {
                session.user.role = token.role;
            }

            console.log("SESSION", session);

            return session;
        },
        async jwt({ token }) {
            if (!token.sub) return token;

            token.isAdmin = await getRole(token.sub);
            token.role = token.isAdmin ? "admin" : "user";
            console.log("JWT ROLE", token.isAdmin, token.role);

            return token;
        },
    }
})