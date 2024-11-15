import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function getAllUsers() {
    return prisma.users.findMany();
}

async function getAllProducts() {
    return prisma.products.findMany();
}

async function findUser(email: string) {
    return prisma.users.findUnique({
        where: {
            email: email
        }
    });
}

async function insertUser(email: string, name: string, password: string) {
    return prisma.users.create({
        data: {
            email: email,
            name: name,
            password: password,
            createdAt: new Date(),
            updatedAt: new Date()
        }
    });
}

const db = prisma;

export {getAllUsers, findUser, insertUser,getAllProducts ,db};
