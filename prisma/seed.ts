import { PrismaClient } from '@prisma/client'
import  menuItems from './data'
import {saltAndHashPassword} from "@/utils/password";
const prisma = new PrismaClient()
async function main() {
    for (const item of menuItems) {
        await prisma.products.create({
            data: {
                name: item.name,
                price: item.price,
                category: item.category,
                image: item.image || 'default-image.jpg',
                createdAt: new Date(),
                updatedAt: new Date(),
            }
        })
    }

    await prisma.users.create({
        data: {
            email: 'admin@gilde.nl',
            name: 'GILDE{DATABASE}',
            password: await saltAndHashPassword('p1ZoLJOTIOOytkCazU7J8Q=='),
            pastOrders: {},
            cart: {},
            Receipts: {},
            createdAt: new Date(),
            updatedAt: new Date(),
        }
    })

}
main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })