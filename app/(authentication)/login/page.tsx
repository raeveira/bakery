'use client'

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { doCredentialLogin } from "@/app/actions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from 'lucide-react';
import {decrypt} from "@/app/actions/crypto";

export default function LoginPage() {
    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        const loginFunction = async () => {

            if(searchParams){
            const loginData = searchParams.get('encryptedFormData');

            if (loginData) {
                const decryptedFormData= await decrypt(loginData);
                const parsedFormData = await JSON.parse(decryptedFormData);
                await doCredentialLogin(parsedFormData).then(() => {
                    router.push('/?login=success');
                });
            }}
        };

        loginFunction().then();
    }, [router, searchParams]);

    return (
        <div className="flex items-center justify-center flex-grow">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold text-center">Logging in</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col items-center space-y-4">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    <p className="text-center text-gray-600">
                        Please wait while we securely log into your account...
                    </p>
                </CardContent>
            </Card>
        </div>
    )
}