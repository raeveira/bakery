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
import {useRouter} from "next/navigation"
import React from "react"
import {EyeIcon, EyeOffIcon} from "lucide-react";
import {encrypt} from "@/app/actions/crypto";


export default function LoginForm() {
    const router = useRouter()
    const [errorMessage, setErrorMessage] = React.useState<string | null>(null)
    const [showPassword, setShowPassword] = React.useState(false)

    const form = useForm<z.infer<typeof signInSchema>>({
        resolver: zodResolver(signInSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    async function handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        try {
            const formData = new FormData(event.currentTarget)
            const validatedForm = signInSchema.parse(Object.fromEntries(formData))
            console.log(validatedForm)
            const JSONFORM = JSON.stringify(validatedForm)
            const encryptedFormData = await encrypt(JSONFORM)
            router.push(`/login?encryptedFormData=${encryptedFormData}`)

        } catch (err: unknown) {
            if (err instanceof z.ZodError) {
                setErrorMessage(err.errors[0].message)
            } else {
                setErrorMessage(err instanceof Error ? err.message : "An unknown error occurred")
            }
        }
    }

    return (
        <div className="space-y-2">
            <h2 className="text-lg font-semibold">Login</h2>
            {errorMessage && (
                <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                    {errorMessage}
                </div>
            )}
            <Form {...form}>
                <form onSubmit={handleFormSubmit} className="space-y-4">
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
                    <Button type="submit" className="w-full">Login</Button>
                </form>
            </Form>
        </div>
    )
}