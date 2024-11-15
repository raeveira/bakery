import {auth} from "@/lib/auth"
import NavMenu from "@/components/NavMenu";
import React from "react";

export default async function Page() {

    const session = await auth();

    return (
        <>
            <NavMenu/>
            <main className="flex-grow container mx-auto px-4 py-8">

            </main>
        </>

    );
}