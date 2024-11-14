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
                createdAt: new Date(),
                updatedAt: new Date(),
            }
        })
    }
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