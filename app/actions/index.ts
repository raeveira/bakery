'use server'

import {signIn, signOut} from '@/lib/auth';
import {insertUserDB} from '@/utils/db';
import {saltAndHashPassword} from "@/utils/password";
import {AuthError} from "next-auth";
import {RateLimit} from "@/app/actions/rateLimit";

export async function doCredentialLogin(formData: { email: string, password: string }) {
    try {
        await RateLimit.checkRateLimit();

        const email = formData.email;
        const password = formData.password;

        if (!email || !password) {
            return { success: false, error: "Email and password are required" };
        }

        const signInResponse = await signIn('credentials', {
            email: email,
            password: password,
            redirect: false
        });

        if (signInResponse?.requires2FA) {
            // Handle 2FA logic here
            return { success: true, requires2FA: true };
        }

        return { success: true };
    } catch (err: unknown) {
        if (err instanceof AuthError) {
            switch (err.type) {
                case "CredentialsSignin":
                    return { success: false, error: "Invalid credentials" };
                default:
                    return { success: false, error: "An unknown error occurred" };
            }
        }

        return { success: false, error: err instanceof Error ? err.message : "An unknown error occurred" };
    }
}

export async function logout() {
    await signOut({redirectTo: "/logout"});
}

export async function doCredentialRegister(validatedData: {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}) {
    try {
        await RateLimit.checkRateLimit();

        if (!validatedData) {
            return {success: false, error: "No form data provided"};
        }

        const hashedPassword = await saltAndHashPassword(validatedData.password);
        const registeredUser = await insertUserDB(validatedData.email, validatedData.name, hashedPassword);
        if (registeredUser) {
            return {success: true};
        } else {
            return {success: false, error: "Failed to register user"};
        }
    } catch (err: unknown) {
        return {success: false, error: err instanceof Error ? err.message : "An unknown error occurred"};
    }
}