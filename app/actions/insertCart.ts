'use server'
import {MenuItem} from "@/lib/types/prismaData";
import {auth} from "@/lib/auth";
import {insertCart} from "@/prisma/prismaClient";

export const insertCartDB = async (product: MenuItem) => {
    const session = await auth();
    if(!session){
        return null;
    }
    const response = await insertCart(product, session.user)

    if(!response){
        return ({error: "Error inserting cart"})
    } else {
        return ({message: `Added ${product.name} to cart`})
    }
}