'use server'
import { updateCartItemQuantity } from '@/prisma/prismaClient'

export const updateCartItemQuantityDB = async (id: string, quantity: number) => {
    try {
        await updateCartItemQuantity(id, quantity)
        return { message: 'Quantity updated' }
    } catch (error) {
        console.error(error)
        return { error: 'An error occurred while updating quantity' }
    }
}