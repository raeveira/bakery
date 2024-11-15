'use server'
import {auth} from '@/lib/auth';
import {getCartItemsDB} from '@/prisma/prismaClient';
import {CartItem} from '@/lib/types/cartItem';

export const getCartItems = async (): Promise<CartItem[] | {error: string} | null> => {
    const session = await auth();
    if (!session) {
        return null;
    }
    const response = await getCartItemsDB(session.user);
    if (!response) {
        return ({error: 'An error occurred while fetching cart items'});
    } else {
        return response;
    }
}