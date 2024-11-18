'use server'
// Retrieve entire user from database, check if the password is the same (bcrypt) then return the password
import { findUser } from '@/prisma/prismaClient'
import bcrypt from 'bcryptjs'

export async function checkPassword(email: string, password: string) {
    console.log(`Checking password for email: ${email}`); // Log the email being checked

    const user = await findUser(email)
    if (!user) {
        console.log('User not found'); // Log if the user is not found
        throw new Error('User not found')
    }

    console.log('User found:', user); // Log the user details

    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
        console.log('Invalid password'); // Log if the password is invalid
        throw new Error('Invalid password')
    }

    console.log('Password is valid'); // Log if the password is valid

    return user.password
}