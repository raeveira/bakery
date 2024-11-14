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
import {doCredentialLogin} from "@/app/actions"
import {useRouter} from "next/navigation"
import React from "react"

export default function LoginForm() {
    const router = useRouter()
    const [errorMessage, setErrorMessage] = React.useState<string | null>(null)

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
            const response = await doCredentialLogin(formData)

            if (!response.success) {
                setErrorMessage(response.error ?? "An unknown error occurred")
            } else {
                router.push("/home")
            }
        } catch (err: unknown) {
            setErrorMessage(err instanceof Error ? err.message : "An unknown error occurred")
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
                                    <Input type="password" placeholder="Enter your password" {...field} />
                                </FormControl>
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