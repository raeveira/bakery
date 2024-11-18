'use server'
import {updateUser} from '@/prisma/prismaClient'
import {auth} from '@/lib/auth'

export async function updateUserDB(username: string, email: string, password?: string) {
    const session = await auth();
    if(!session) return null;
    return updateUser(session.user?.email ?? '', username, email, password)
}