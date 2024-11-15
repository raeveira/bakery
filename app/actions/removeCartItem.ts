'use server'
import {removeCartItem} from "@/prisma/prismaClient";

export const removeCartItemDB = async (cartItemId: string) => {
    try {
        await removeCartItem(cartItemId);
        return {message: 'Item removed'}
    } catch (error) {
        console.error(error);
        return {error: 'An error occurred while removing item'}
    }
}