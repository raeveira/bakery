import { findUser } from "@/prisma/prismaClient";
import { insertUser } from "@/prisma/prismaClient";

export const getUserFromDb = async (email: string) => {

    const user = await findUser(email);

    if (!user) {
        return null;
    }

    return user
};

export const insertUserDB = async (email: string, name: string, password: string) => {
    const user = await findUser(email);
    if(user){
        throw new Error("Email is already taken");
    }
    return await insertUser(email, name, password);
}