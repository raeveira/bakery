import {PrismaClient} from '@prisma/client'
import {MenuItem} from "@/lib/types/prismaData";
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export async function getAllProducts() {
    return prisma.products.findMany();
}

export async function findUser(email: string) {
    return prisma.users.findUnique({
        where: {
            email: email
        }
    });
}

export async function insertUser(email: string, name: string, password: string) {
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

export const insertCart = async (product: MenuItem, sessionUser: any) => {

    const user = await findUser(sessionUser.email);

    if (!user) {
        return null;
    }

    let cart = await prisma.cart.findUnique({
        where: { userId: user.id }
    });

    if (!cart) {
        cart = await prisma.cart.create({
            data: {
                userId: user.id,
                createdAt: new Date(),
                updatedAt: new Date()
            }
        });
    } else {
        await prisma.cart.update({
            where: { id: cart.id },
            data: { updatedAt: new Date() }
        });
    }

    const cartItem = await prisma.cartItem.findUnique({
        where: {
            cartId_productId: {
                cartId: cart.id,
                productId: product.id ?? ''
            }
        }
    });

    if (cartItem) {
        return prisma.cartItem.update({
            where: {
                id: cartItem.id
            },
            data: {
                quantity: { increment: 1 },
                updatedAt: new Date()
            }
        });
    } else {
        return prisma.cartItem.create({
            data: {
                cartId: cart.id,
                productId: product.id ?? '',
                quantity: 1,
                createdAt: new Date(),
                updatedAt: new Date()
            }
        });
    }
}

export async function updateCartItemQuantity(id: string, quantity: number) {
    return prisma.cartItem.update({
        where: { id: id },
        data: { quantity: quantity }
    });
}

export async function removeCartItem(id: string) {
    return prisma.cartItem.delete({
        where: { id: id }
    });
}

export async function clearCartItems(sessionUser: any) {
    const user = await findUser(sessionUser.email);

    if (!user) {
        return null;
    }

    const cart = await prisma.cart.findUnique({
        where: { userId: user.id }
    });

    if (!cart) {
        return null;
    }

    return prisma.cartItem.deleteMany({
        where: { cartId: cart.id }
    });
}

export async function getCartItemsDB(sessionUser: any) {
    const user = await findUser(sessionUser.email);

    if (!user) {
        return null;
    }

    const cart = await prisma.cart.findUnique({
        where: { userId: user.id }
    });

    if (!cart) {
        return null;
    }

    return prisma.cartItem.findMany({
        where: { cartId: cart.id },
        include: {
            product: true
        }
    });
}

export async function updateUser(oldEmail: string, name?: string, email?: string, password?: string) {
    const dataContent: { updatedAt: Date, password?: string, name?: string, email?: string } = { updatedAt: new Date() };
    if (password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        dataContent.password = hashedPassword;
    }
    if (name) {
        dataContent.name = name;
    }
    if (email) {
        dataContent.email = email;
    }

    if (!oldEmail || oldEmail === '') {
        return null;
    }

    return prisma.users.update({
        where: { email: oldEmail },
        data: dataContent,
    });
}

export const db = prisma;

