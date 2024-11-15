import Credentials from "next-auth/providers/credentials";

import {CredentialsSignin, NextAuthConfig} from "next-auth";
import {signInSchema} from "@/lib/zod";
import {getUserFromDb} from "@/utils/db";
import bcrypt from "bcryptjs";
import {ZodError} from "zod";
declare let errorM: string;
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
                            errorM = "Invalid credentials";
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