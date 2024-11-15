'use client'

import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import * as z from "zod"
import {signUpSchema} from "@/lib/zod"
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
import {EyeIcon, EyeOffIcon} from "lucide-react"
import {doCredentialRegister} from "@/app/actions";
import {useRouter} from "next/navigation"
import React, {useState} from "react"
import {ZodError} from "zod";

export default function RegisterForm() {
    const router = useRouter()

    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    const form = useForm<z.infer<typeof signUpSchema>>({
        resolver: zodResolver(signUpSchema),
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

            const validatedData = signUpSchema.parse({
                name: formData.get('name') as string,
                email: formData.get('email') as string,
                password: formData.get('password') as string,
                confirmPassword: formData.get('confirmPassword') as string,
            });

            const response = await doCredentialRegister(validatedData);

            if (!response.success) {
                setErrorMessage(response.error ?? "An unknown error occurred");
            } else {
                router.push("/home");
            }
        } catch (err: unknown) {
            setErrorMessage(err instanceof ZodError ? JSON.parse(err.message)[0].message  : "An unknown error occurred");
        }
    }

    return (
        <div className="space-y-2">
            <h2 className="text-lg font-semibold">Register</h2>
            {errorMessage && (
                <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded">
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
        </div>
    )
}