'use server'

import bcrypt from 'bcryptjs';

export const saltAndHashPassword = async (password: string) => {
    try {
        return await bcrypt.hash(password, 10);
    } catch (err: unknown) {
        if (err instanceof Error) {
            throw new Error(err.message);
        } else {
            throw new Error("An unknown error occurred");
        }
    }
}