'use server'

import {signIn, signOut} from '@/lib/auth';
import {insertUserDB} from '@/utils/db';
import {saltAndHashPassword} from "@/utils/password";

export async function doCredentialLogin(formData: { get: (arg0: string) => any; }) {
    try {
        const response = await signIn('credentials', {
            email: formData.get('email'),
            password: formData.get('password'),
            redirect: false
        });
        return {success: true, data: response};
    } catch (err: unknown) {
        return {success: false, error: err instanceof Error ? err.message : "An unknown error occurred"};
    }
}

export async function logout() {
    await signOut({redirectTo: "/logout"});
}

export async function doCredentialRegister(formData: { get: (arg0: string) => any; }) {
    try {
        if (!formData) {
            return {success: false, error: "No form data provided"};
        }

        const hashedPassword = await saltAndHashPassword(formData.get('password'));
        const registeredUser = await insertUserDB(formData.get('email'), formData.get('name'), hashedPassword);
        if (registeredUser) {
            const response = await signIn('credentials', {
                email: formData.get('email'),
                password: formData.get('password'),
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