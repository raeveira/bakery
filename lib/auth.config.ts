import Credentials from "next-auth/providers/credentials";

import type { NextAuthConfig} from "next-auth";
import {signInSchema} from "@/lib/zod";
import {getUserFromDb} from "@/utils/db";
import bcrypt from "bcryptjs";
import {ZodError} from "zod";

export default {
    providers: [
        Credentials({
            async authorize(credentials) {
                if (credentials === null) return null;

                console.log("credentials", credentials);
                try {
                    const parsedCredentials = signInSchema.parse(credentials);

                    const user = await getUserFromDb(parsedCredentials.email);
                    if (user) {

                        const isMatch = await bcrypt.compare(parsedCredentials.password, user.password);

                        if (isMatch) {
                            return user;
                        } else {
                            throw new Error("Password is incorrect");
                        }
                    } else {
                        throw new Error("No user found");
                    }
                } catch (error: unknown) {
                    if (error instanceof ZodError) {
                        throw new Error(error.errors[0].message);
                    } else if (error instanceof Error) {
                        throw new Error(error.message);
                    } else {
                        throw new Error("An unknown error occurred");
                    }
                }
            }
        })
    ],
} satisfies NextAuthConfig