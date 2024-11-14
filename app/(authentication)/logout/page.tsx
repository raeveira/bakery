'use client'

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { logout } from "@/app/actions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from 'lucide-react';

export default function LogoutPage() {
    const router = useRouter();

    useEffect(() => {
        logout().then(() => {
            router.push("/");
        });
    }, [router]);

    return (
        <div className="flex items-center justify-center flex-grow">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold text-center">Logging Out</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col items-center space-y-4">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    <p className="text-center text-gray-600">
                        Please wait while we securely log you out of your account...
                    </p>
                </CardContent>
            </Card>
        </div>
    )
}