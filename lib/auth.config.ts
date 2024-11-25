import Credentials from "next-auth/providers/credentials";

import {NextAuthConfig} from "next-auth";
import {signInSchema} from "@/lib/zod";
import {getUserFromDb} from "@/utils/db";
import bcrypt from "bcryptjs";
import {ZodError} from "zod";
import {getRole} from "@/app/actions/getRole";

export default {
    providers: [
        Credentials({
            async authorize(credentials) {
                if (credentials === null) return null;

                try {
                    const parsedCredentials = signInSchema.parse(credentials);

                    const user = await getUserFromDb(parsedCredentials.email);
                    if (user) {

                        const isMatch = await bcrypt.compare(parsedCredentials.password, user.password);

                        if (isMatch) {
                            return user;
                        } else {
                            return null;
                        }
                    } else {
                         return null;
                    }
                } catch (error: unknown) {
                    if (error instanceof ZodError) {
                        return null
                    } else if (error instanceof Error) {
                        return null
                    } else {
                        return null
                    }
                }
            }
        })
    ],
} satisfies NextAuthConfig