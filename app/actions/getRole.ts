import { PrismaClient } from '@prisma/client'

export async function getRole(sub: string) {
    const prisma = new PrismaClient()

    return prisma.users.findUnique({
        where: {
            id: sub
        },
        select: {
            role: true
        }
    }).then((user) => {
        return user?.role === "admin";
    })
}