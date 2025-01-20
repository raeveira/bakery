'use server'
import {auth} from '@/lib/auth';
import {clearCartItems, getCartItemsDB, getUserBalance, updateUserBalance} from "@/prisma/prismaClient";

export const checkOut = async () => {
    const session = await auth();

    if (!session) {
        return false;
    }

    const balance = await getUserBalance(session.user);

    if (!balance || balance.balance < 0) {
        return false;
    }

    console.log("User balance:", balance);

    const cartItems = await getCartItemsDB(session.user);

    if (!cartItems) {
        return false;
    }

    console.log("Cart items:", cartItems);

    // Calculate total price of cart items
    const totalPrice = cartItems.reduce((acc: number, item) => {
        return acc + item.product.price * item.quantity;
    }, 0);

    console.log("Total price:", totalPrice);

    // Check if user has enough balance
    if (balance.balance < totalPrice) {
        return false;
    }

    // Update user balance
    const newBalance = await updateUserBalance(session.user, balance.balance - totalPrice);
    console.log("New balance:", newBalance);

    // Clear cart items
    const data = await clearCartItems(session.user);
    console.log("Cleared cart items:", data);
    return !!data;
}