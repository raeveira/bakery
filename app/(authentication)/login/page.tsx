'use client'

import {useRouter, useSearchParams} from "next/navigation";
import {Suspense, useEffect, useState} from "react";
import {doCredentialLogin} from "@/app/actions";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Loader2} from 'lucide-react';
import {decrypt} from "@/app/actions/crypto";
import {generate2FACode, handle2FA, send2FACode} from '@/app/actions/2fa';
import {Button} from "@/components/ui/button";
import {InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot,} from "@/components/ui/input-otp"
import {REGEXP_ONLY_DIGITS_AND_CHARS} from "input-otp"

function LoginPageContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [is2FARequired, setIs2FARequired] = useState(false);
    const [generatedCode, setGeneratedCode] = useState<string | null>(null);
    const [userEmail, setUserEmail] = useState<string | null>(null);
    const [inputCode, setInputCode] = useState<string>("");

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

                    if (parsedFormData) {
                        const email = parsedFormData.email;
                        const code = generate2FACode();
                        setGeneratedCode(code);
                        setUserEmail(email);
                        setIs2FARequired(true);
                        send2FACode(code, email);
                        setInputCode('')
                    } else {
                        setError('Something went wrong, please try again later.')
                    }
                }
            } catch (err) {
                setError((err as Error).message || "An unexpected error occurred.");
            } finally {
                setIsLoading(false);
            }
        };

        loginFunction().then();
    }, [router, searchParams]);

    const handle2FASubmit = async () => {
        console.log("AAAAAAAAA", inputCode.length)
        if (inputCode.length <= 5) {
            setError('Code is not correct')
            await new Promise(resolve => setTimeout(resolve, 3000))
            setError(null);
        } else {
            if (userEmail && generatedCode) {
                try {

                    console.log("Verifying 2FA code...");
                    console.log("User email:", userEmail);
                    console.log("Input code:", inputCode);
                    console.log("Generated code:", generatedCode);
                    const result = await handle2FA(userEmail, inputCode, generatedCode);
                    console.log("2FA verification result:", result);
                    if (result.success) {
                        if (searchParams) {
                            const loginData = searchParams.get('encryptedFormData');
                            if (!loginData) {
                                throw new Error("No encrypted form data provided.");
                            }

                            const decryptedFormData = await decrypt(loginData);

                            const parsedFormData = JSON.parse(decryptedFormData);

                            const loginResponse = await doCredentialLogin(parsedFormData) ?? {
                                success: false,
                                error: "Unexpected error."
                            };

                            if (loginResponse.success) {
                                router.push('/')
                            } else {
                                setError(loginResponse.error || "Invalid credentials");
                            }
                        }
                    } else {
                        setError("2FA verification failed.");
                    }
                } catch (err) {
                    console.error("Error during 2FA verification:", err);
                    setError("An unexpected error occurred during 2FA verification.");
                }
            } else {
                setError("2FA verification failed.");
            }
        }
    };

    return (
        <div className="flex items-center justify-center flex-grow">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold text-center">
                        {isLoading ? "Logging in" : error ? "Login Failed" : is2FARequired ? "Enter 2FA Code" : "Redirecting..."}
                    </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col items-center space-y-4">
                    {isLoading ? (
                        <>
                            <Loader2 className="h-8 w-8 animate-spin text-primary"/>
                            <p className="text-center text-gray-600">
                                Please wait while we securely log into your account...
                            </p>
                        </>
                    ) : error ? (
                        <p className="text-center text-red-600">{error}</p>
                    ) : is2FARequired ? (
                        <>
                            <InputOTP maxLength={6} pattern={REGEXP_ONLY_DIGITS_AND_CHARS} value={inputCode}
                                      onChange={(inputCode) => setInputCode(inputCode)}>
                                <InputOTPGroup>
                                    <InputOTPSlot index={0}/>
                                    <InputOTPSlot index={1}/>
                                    <InputOTPSlot index={2}/>
                                </InputOTPGroup>
                                <InputOTPSeparator/>
                                <InputOTPGroup>
                                    <InputOTPSlot index={3}/>
                                    <InputOTPSlot index={4}/>
                                    <InputOTPSlot index={5}/>
                                </InputOTPGroup>
                            </InputOTP>
                            <Button onClick={handle2FASubmit}>Verify</Button>
                        </>
                    ) : (
                        <p className="text-center text-gray-600">You are being redirected...</p>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}

export default function LoginPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <LoginPageContent/>
        </Suspense>
    );
}