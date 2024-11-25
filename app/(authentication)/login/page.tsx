'use client'

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { doCredentialLogin } from "@/app/actions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from 'lucide-react';
import { decrypt } from "@/app/actions/crypto";

export default function LoginPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loginFunction = async () => {
            try {
                if (searchParams) {
                    const loginData = searchParams.get('encryptedFormData');
                    if (!loginData) {
                        throw new Error("No encrypted form data provided.");
                    }

                    const decryptedFormData = await decrypt(loginData);


                    const parsedFormData = JSON.parse(decryptedFormData);


                    const loginResponse = await doCredentialLogin(parsedFormData) || { success: false, error: "Unexpected error." };


                    if (loginResponse.success) {
                        router.push('/');
                    } else {
                        setError(loginResponse.error || "Invalid credentials");
                    }
                }
            } catch (err: any) {
                setError(err.message || "An unexpected error occurred.");
            } finally {
                setIsLoading(false);
            }
        };

        loginFunction().then();
    }, [router, searchParams]);

    useEffect(() => {
        if (error) {

            const timer = setTimeout(() => {
                setError(null);
                router.push('/');
            }, 2000);

            return () => clearTimeout(timer);
        }
    }, [error, router]);

    return (
        <div className="flex items-center justify-center flex-grow">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold text-center">
                        {isLoading ? "Logging in" : error ? "Login Failed" : "Redirecting..."}
                    </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col items-center space-y-4">
                    {isLoading ? (
                        <>
                            <Loader2 className="h-8 w-8 animate-spin text-primary" />
                            <p className="text-center text-gray-600">
                                Please wait while we securely log into your account...
                            </p>
                        </>
                    ) : error ? (
                        <p className="text-center text-red-600">{error}</p>
                    ) : (
                        <p className="text-center text-gray-600">You are being redirected...</p>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
