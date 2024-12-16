'use server'
// Retrieve entire user from database, check if the password is the same (bcrypt) then return the password
import { findUser } from '@/prisma/prismaClient'
import bcrypt from 'bcryptjs'

export async function checkPassword(email: string, password: string) {

    const user = await findUser(email)
    if (!user) {
        throw new Error('User not found')
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
        throw new Error('Invalid password')
    }

    return user.password
}