'use server'
import {MenuItem} from "@/lib/types/prismaData";
import {auth} from "@/lib/auth";
import {insertCart} from "@/prisma/prismaClient";
import {RateLimit} from "@/app/actions/rateLimit";

export const insertCartDB = async (product: MenuItem) => {
    const session = await auth();
    if (!session) {
        return null;
    }

    try {
        // Check rate limit
        await RateLimit.checkRateLimit();

        // Attempt to insert the product into the cart
        const response = await insertCart(product, session.user);

        if (!response) {
            return { error: "Error inserting cart" };
        }

        return { message: `Added ${product.name} to cart` };
    } catch (error) {
        if (error instanceof Error) {
            return { error: error.message };
        } else {
            return { error: "An error occurred" };
        }
    }
}