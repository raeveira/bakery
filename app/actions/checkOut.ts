'use server'
import {auth} from '@/lib/auth';
import {clearCartItems} from "@/prisma/prismaClient";

export const checkOut = async () => {
    const session = await auth();

    if (!session) {
        return false;
    }

    const data = await clearCartItems(session.user);
    console.log("Cleared cart items:", data);
    return !!data;
}