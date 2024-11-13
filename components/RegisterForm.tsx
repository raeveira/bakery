'use client'

import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import * as z from "zod"
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
import React, {useState} from "react"
import {EyeIcon, EyeOffIcon} from "lucide-react"
import {useRouter} from "next/navigation"
import {doCredentialRegister} from "@/app/actions";

const formSchema = z.object({
    name: z.string().min(2, {
        message: "Name must be at least 2 characters.",
    }),
    email: z.string().email({
        message: "Please enter a valid email address.",
    }),
    password: z.string().min(8, {
        message: "Password must be at least 8 characters.",
    }),
    confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
})

export default function RegisterForm() {
    const router = useRouter()

    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
    })

    async function handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        try {
            const formData = new FormData(event.currentTarget);

            const response = await doCredentialRegister(formData);

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
                    <CardTitle>Register</CardTitle>
                    <CardDescription>Create a new account to get started.</CardDescription>
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
                                name="name"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter your name" {...field} />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="email"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input type="email" placeholder="Enter your email" {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            We&apos;ll never share your email with anyone else.
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
                                            <div className="relative">
                                                <Input
                                                    type={showPassword ? "text" : "password"}
                                                    placeholder="Enter your password"
                                                    {...field}
                                                />
                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    size="sm"
                                                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                                    onClick={() => setShowPassword(!showPassword)}
                                                >
                                                    {showPassword ? (
                                                        <EyeOffIcon className="h-4 w-4"/>
                                                    ) : (
                                                        <EyeIcon className="h-4 w-4"/>
                                                    )}
                                                    <span className="sr-only">
                            {showPassword ? "Hide password" : "Show password"}
                          </span>
                                                </Button>
                                            </div>
                                        </FormControl>
                                        <FormDescription>
                                            Your password must be at least 8 characters long.
                                        </FormDescription>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="confirmPassword"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Confirm Password</FormLabel>
                                        <FormControl>
                                            <div className="relative">
                                                <Input
                                                    type={showConfirmPassword ? "text" : "password"}
                                                    placeholder="Confirm your password"
                                                    {...field}
                                                />
                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    size="sm"
                                                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                >
                                                    {showConfirmPassword ? (
                                                        <EyeOffIcon className="h-4 w-4"/>
                                                    ) : (
                                                        <EyeIcon className="h-4 w-4"/>
                                                    )}
                                                    <span className="sr-only">
                            {showConfirmPassword ? "Hide password" : "Show password"}
                          </span>
                                                </Button>
                                            </div>
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                            <Button type="submit" className="w-full">Register</Button>
                        </form>
                    </Form>
                    <div className="text-center text-sm text-gray-500 dark:text-gray-400 mt-4">
                        Already have an account?{' '}
                        <Button
                            variant="link"
                            className="p-0 h-auto font-normal text-primary hover:underline"
                            onClick={() => router.push("/login")}
                        >
                            Log in
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </main>
    )
}