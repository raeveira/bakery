'use client'

import Link from 'next/link'
import {usePathname, useRouter} from 'next/navigation'
import {ShoppingCart, User} from 'lucide-react'
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover"
import {Button} from "@/components/ui/button"
import LoginForm from '@/components/LoginForm'
import RegisterForm from '@/components/RegisterForm'
import {useEffect, useState} from 'react'
import getSessionStatus from "@/app/actions/getSessionStatus";
import {logout} from "@/app/actions";

export default function NavMenu() {
    const router = useRouter();
    const pathname = usePathname()
    const [showLogin, setShowLogin] = useState(false)
    const [showRegister, setShowRegister] = useState(false)
    const [session, setSession] = useState<any>(null)

    async function fetchSession() {
        const sessionData = await getSessionStatus()
        setSession(sessionData)
    }

    useEffect(() => {
        fetchSession().then(r => r);
    }, [])

    return (
        <header className="w-full bg-black text-white py-4">
            <div className="container mx-auto px-4 flex justify-between items-center">
                <Link href="/" className="text-2xl font-bold">
                    Sweet Delights Bakery
                </Link>

                <div className="flex items-center gap-8">
                    <nav className="flex items-center gap-6">
                        <Link
                            href="/"
                            className={`hover:text-gray-300 transition-colors ${pathname === '/' ? 'text-white' : 'text-gray-300'}`}
                        >
                            Home
                        </Link>
                        <Link
                            href="/menu"
                            className={`hover:text-gray-300 transition-colors ${pathname === '/menu' ? 'text-white' : 'text-gray-300'}`}
                        >
                            Menu
                        </Link>
                        <Link
                            href="/about"
                            className={`hover:text-gray-300 transition-colors ${pathname === '/about' ? 'text-white' : 'text-gray-300'}`}
                        >
                            About
                        </Link>
                        <Link
                            href="/contact"
                            className={`hover:text-gray-300 transition-colors ${pathname === '/contact' ? 'text-white' : 'text-gray-300'}`}
                        >
                            Contact
                        </Link>
                    </nav>

                    <div className="flex items-center gap-6">
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button variant="link"
                                        className="flex items-center text-white gap-2 p-0 hover:no-underline hover:text-gray-300 transition-colors">
                                    <User className="h-5 w-5"/>
                                    Account
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-[500px]">
                                <div className="flex gap-4">
                                    <div className="w-80">
                                        {showLogin && <LoginForm />}
                                        {showRegister && <RegisterForm />}
                                        {session && (
                                            <div className="">
                                                Good {new Date().getHours() < 12 ? 'morning' : 'afternoon'}, {session.user.name}!<br/>
                                                Ready to explore more sweet delights?
                                            </div>
                                        )}
                                        {!showLogin && !showRegister && !session && (
                                            <div className="space-y-2">
                                                <h4 className="font-medium leading-none">Select an option</h4>
                                                <p className="text-sm text-muted-foreground">
                                                    Click on Login or Register to see the respective form
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                    <div className="space-y-4 border-l pl-4">
                                        <div className="space-y-2">
                                            <h4 className="font-medium leading-none">Account</h4>
                                            <p className="text-sm text-muted-foreground">
                                                Manage your account
                                            </p>
                                        </div>
                                        <div className="grid gap-2">
                                            {session ? (
                                                <Button variant="outline" onClick={async () => {
                                                    router.push("/logout");
                                                }}>
                                                    Logout
                                                </Button>
                                            ) : (
                                                <>
                                                    <Button
                                                        variant="outline"
                                                        onClick={() => {
                                                            setShowLogin(true)
                                                            setShowRegister(false)
                                                        }}
                                                    >
                                                        Login
                                                    </Button>
                                                    <Button
                                                        variant="outline"
                                                        onClick={() => {
                                                            setShowRegister(true)
                                                            setShowLogin(false)
                                                        }}
                                                    >
                                                        Register
                                                    </Button>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </PopoverContent>
                        </Popover>
                        <Link href="/cart" className="flex items-center gap-2 hover:text-gray-300 transition-colors">
                            <ShoppingCart className="h-5 w-5"/>
                            Cart
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    )
}
