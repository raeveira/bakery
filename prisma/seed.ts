import { PrismaClient } from '@prisma/client'
import  menuItems from './data'

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
            id: 'GILDE{DATABASE}',
            email: 'admin@gilde.nl',
            name: 'Admin',
            password: '$2a$10$hpG.wM9alm7pkI58I1WTt.JdI7amCh8Q0DHKfVMvl/t6B3CTdlFNy', //p1ZoLJOTIOOytkCazU7J8Q==
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