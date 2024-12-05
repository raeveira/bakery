'use client'
import {Button} from "@/components/ui/button"
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card"
import {Cake, Croissant, Cookie} from 'lucide-react'
import Link from 'next/link'
import React, { Suspense } from "react";
import NavMenu from "@/components/NavMenu";
import { useSearchParams } from "next/navigation";
import {toast} from 'sonner';
import Footer from "@/components/Footer";
import Image from "next/image";
import {Itim} from 'next/font/google'

const itim = Itim({
    subsets: ['latin'],
    weight: "400",
    display: 'swap'
})

function HomeContent() {
    const searchParams = useSearchParams();
    const loginSuccess = searchParams.get('login') === 'success';
    if (loginSuccess) {
        toast.success('Login successful');
    }

    return (
        <>
            <NavMenu/>
            <main className="flex-grow">
                <section className="bg-muted py-20 relative">
                    <Image src={'/images/banner.png'} alt={'product banner'} fill={true} className={'object-cover'} />
                    <div className="absolute inset-0 bg-black bg-opacity-50"/>
                    <div className="container mx-auto text-center relative z-[1] text-white">
                        <h1 className="text-4xl font-bold mb-4">Welcome to Sweet Delights Bakery</h1>
                        <p className="text-xl mb-8">Indulge in our freshly baked goods made with love</p>
                        <Button size="lg" variant={'secondary'} ><Link href={'/menu'} className={`${itim.className} text-xl`}>View Our Menu</Link></Button>
                    </div>
                </section>

                <section className="py-20">
                    <div className="container mx-auto">
                        <h2 className="text-3xl font-bold text-center mb-12">Our Featured Products</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <FeaturedProduct title="Artisan Bread" icon={<Cake className="h-12 w-12"/>}/>
                            <FeaturedProduct title="Flaky Croissants" icon={<Croissant className="h-12 w-12"/>}/>
                            <FeaturedProduct title="Gourmet Cookies" icon={<Cookie className="h-12 w-12"/>}/>
                        </div>
                    </div>
                </section>
            </main>
            <Footer/>
        </>
    )
}

export default function Home() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <HomeContent />
        </Suspense>
    );
}

function FeaturedProduct({title, icon}: { title: string, icon: React.ReactNode }) {
    return (
        <Card className="text-center">
            <CardHeader>
                <CardTitle>{title}</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex justify-center">{icon}</div>
            </CardContent>
            <CardFooter className="flex justify-center">
                <Button variant="outline">Learn More</Button>
            </CardFooter>
        </Card>
    )
}