'use server'

import bcrypt from 'bcryptjs';

export const saltAndHashPassword = async (password: string) => {
    try {
        const hashed = await bcrypt.hash(password, 10);
        console.log(hashed);
        return hashed;
    } catch (err: unknown) {
        if (err instanceof Error) {
            throw new Error(err.message);
        } else {
            throw new Error("An unknown error occurred");
        }
    }
}