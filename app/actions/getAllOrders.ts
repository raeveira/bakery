'use server'
import {getAllOrdersDB} from "@/prisma/prismaClient";

export async function getAllOrders() {
    return getAllOrdersDB();
}