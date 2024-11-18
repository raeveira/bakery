'use server'

import {signIn, signOut} from '@/lib/auth';
import {insertUserDB} from '@/utils/db';
import {saltAndHashPassword} from "@/utils/password";
import {AuthError} from "next-auth";

export async function doCredentialLogin(formData: { email: string, password: string }) {
    try {
        console.log("FORM DATA", formData);

        const email = formData.email;
        const password = formData.password;

        console.log(email, password)

        if (!email || !password) {
            return {success: false, error: "Email and password are required"};
        }

        await signIn('credentials', {
            email: email,
            password: password,
            redirect: false
        });

        return {success: true};
    } catch (err: unknown) {

        // Check if the error is of type CredentialsSignin
        if (err instanceof AuthError) {
            switch (err.type) {
                case "CredentialsSignin":
                    return {success: false, error: "Invalid credentials"};
                default:
                    return {success: false, error: "An unknown error occurred"};
            }
        }

        // Return generic error message if it's another error
        return {success: false, error: err instanceof Error ? err.message : "An unknown error occurred"};
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
        if (!validatedData) {
            return {success: false, error: "No form data provided"};
        }

        const hashedPassword = await saltAndHashPassword(validatedData.password);
        const registeredUser = await insertUserDB(validatedData.email, validatedData.name, hashedPassword);
        if (registeredUser) {
            const response = await signIn('credentials', {
                email: validatedData.email,
                password: validatedData.password,
                redirect: false
            });
            return {success: true, data: response};
        } else {
            return {success: false, error: "Failed to register user"};
        }
    } catch (err: unknown) {
        return {success: false, error: err instanceof Error ? err.message : "An unknown error occurred"};
    }
}