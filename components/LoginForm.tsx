'use client'

import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import * as z from "zod"
import {signInSchema} from "@/lib/zod"
import {Button} from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {Input} from "@/components/ui/input"
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card"
import {doCredentialLogin} from "@/app/actions";
import {useRouter} from "next/navigation";
import React from "react";

export default function LoginForm() {

    const router = useRouter();

    const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

    const form = useForm<z.infer<typeof signInSchema>>({
        resolver: zodResolver(signInSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    async function handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        try {
            const formData = new FormData(event.currentTarget);

            const response = await doCredentialLogin(formData);

            if (!response.success) {
                setErrorMessage(response.error ?? "An unknown error occurred");
            } else {
                router.push("/home");
            }
        } catch (err: unknown) {
            setErrorMessage(err instanceof Error ? err.message : "An unknown error occurred");
        }
    }

    return (
        <main className="flex justify-center items-center min-h-screen w-full bg-gray-100 dark:bg-gray-900 p-4">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle>Login</CardTitle>
                    <CardDescription>Enter your credentials to access your account.</CardDescription>
                </CardHeader>
                <CardContent className={'space-y-2'}>
                    {errorMessage && (
                        <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                            {errorMessage}
                        </div>
                    )}
                    <Form {...form}>
                        <form onSubmit={handleFormSubmit} className="space-y-6">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter your email" {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            We&apos;ll never share your email.
                                        </FormDescription>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="password"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input type="password" placeholder="Enter your password" {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            Your password must be at least 8 characters long.
                                        </FormDescription>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                            <Button type="submit" className="w-full">Login</Button>
                        </form>
                    </Form>
                    <div className="text-center text-sm text-gray-500 dark:text-gray-400 mt-4">
                        Don&apos;t have an account?{' '}
                        <Button
                            variant="link"
                            className="p-0 h-auto font-normal text-primary hover:underline"
                            onClick={() => router.push("/register")}
                        >
                            Create one!
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </main>
    )
}