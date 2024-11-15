'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { ShoppingBag, ShoppingCart, User, Menu, X } from 'lucide-react'
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import LoginForm from '@/components/LoginForm'
import RegisterForm from '@/components/RegisterForm'
import { useEffect, useState } from 'react'
import getSessionStatus from "@/app/actions/getSessionStatus"
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import ShoppingCartDesc from "@/components/ShoppingCartDesc"

export default function NavMenu() {
    const router = useRouter()
    const pathname = usePathname()
    const [showLogin, setShowLogin] = useState(false)
    const [showRegister, setShowRegister] = useState(false)
    const [session, setSession] = useState<any>(null)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    async function fetchSession() {
        const sessionData = await getSessionStatus()
        setSession(sessionData)
    }

    useEffect(() => {
        fetchSession().then()
    }, [])

    const navLinks = [
        { href: '/', label: 'Home' },
        { href: '/menu', label: 'Menu' },
        { href: '/about', label: 'About' },
        { href: '/contact', label: 'Contact' },
    ]

    return (
        <header className="w-full bg-black text-white py-4">
            <div className="container mx-auto px-4 flex justify-between items-center">
                <Link href="/" className="text-2xl font-bold">
                    Sweet Delights Bakery
                </Link>

                <div className="hidden md:flex items-center gap-8">
                    <nav className="flex items-center gap-6">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`hover:text-gray-300 transition-colors ${pathname === link.href ? 'text-white' : 'text-gray-300'}`}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>

                    <div className="flex items-center gap-6">
                        <AccountPopover
                            session={session}
                            showLogin={showLogin}
                            showRegister={showRegister}
                            setShowLogin={setShowLogin}
                            setShowRegister={setShowRegister}
                            router={router}
                        />
                        {session && <ShoppingCartSheet />}
                    </div>
                </div>

                <div className="md:hidden">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? <X /> : <Menu />}
                    </Button>
                </div>
            </div>

            {isMobileMenuOpen && (
                <div className="md:hidden mt-4">
                    <nav className="flex flex-col items-center gap-4">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`hover:text-gray-300 transition-colors ${pathname === link.href ? 'text-white' : 'text-gray-300'}`}
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                {link.label}
                            </Link>
                        ))}
                        <AccountPopover
                            session={session}
                            showLogin={showLogin}
                            showRegister={showRegister}
                            setShowLogin={setShowLogin}
                            setShowRegister={setShowRegister}
                            router={router}
                        />
                        {session && <ShoppingCartSheet />}
                    </nav>
                </div>
            )}
        </header>
    )
}

function AccountPopover({ session, showLogin, showRegister, setShowLogin, setShowRegister, router }: { session: any, showLogin: boolean, showRegister: boolean, setShowLogin: Function, setShowRegister: Function, router: any }) {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="link"
                    className="flex items-center text-white gap-2 p-0 m-0 h-auto text-base hover:no-underline hover:text-gray-300 transition-colors">
                    <User className="h-5 w-5"/>
                    Account
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[500px] max-md:w-full">
                <div className="flex gap-4 max-md:flex-col">
                    <div className="w-80">
                        {showLogin && <LoginForm/>}
                        {showRegister && <RegisterForm/>}
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
                    <div className="space-y-4 border-l pl-4 max-md:border-t max-md:border-l-0 max-md:pl-0 max-md:pt-4">
                        <div className="space-y-2">
                            <h4 className="font-medium leading-none">Account</h4>
                            <p className="text-sm text-muted-foreground">
                                Manage your account
                            </p>
                        </div>
                        <div className="grid gap-2">
                            {session ? (
                                <Button variant="outline" onClick={() => router.push("/logout")}>
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
    )
}

function ShoppingCartSheet() {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="link"
                    className="flex items-center text-white gap-2 p-0 m-0 h-auto text-base hover:no-underline hover:text-gray-300 transition-colors">
                    <ShoppingCart className="h-5 w-5"/>
                    Cart
                </Button>
            </SheetTrigger>
            <SheetContent className={'flex flex-col'}>
                <SheetHeader>
                    <SheetTitle className="text-2xl font-bold flex items-center gap-2 mb-4">
                        <ShoppingBag className="h-6 w-6"/>
                        Shopping Cart
                    </SheetTitle>
                </SheetHeader>
                <ShoppingCartDesc/>
            </SheetContent>
        </Sheet>
    )
}