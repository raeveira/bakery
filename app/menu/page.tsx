'use client'

import React, {useEffect, useState} from 'react'
import {Button} from "@/components/ui/button"
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card"
import {Tabs, TabsList, TabsTrigger} from "@/components/ui/tabs"
import NavMenu from "@/components/NavMenu";
import {getAllProductsDB} from '@/utils/db';
import {MenuItem} from "@/lib/types/prismaData";
import MenuSkeleton from "@/components/skeletons/MenuSkeleton";
import {insertCartDB} from "@/app/actions/insertCart";
import {toast} from 'sonner';
import {getCartItems} from "@/app/actions/getCartItems";
import {CartItem} from "@/lib/types/cartItem";

export default function MenuPage() {

    const [activeCategory, setActiveCategory] = useState('all')
    const [menuItems, setMenuItems] = useState<MenuItem[]>([])
    const [categories, setCategories] = useState<string[]>([])

    const filteredItems = activeCategory === 'all'
        ? menuItems
        : menuItems.filter(item => item.category === activeCategory)

    React.useEffect(() => {
        getAllProductsDB().then((data: MenuItem[]) => {

            if (data) {
                setMenuItems(data)
                setCategories(['all', ...new Set(data.map(item => item.category))])
            }
        })
    }, [])

    const addToCart = async (product: MenuItem) => {
        const response = await insertCartDB(product)

        if (response?.error) {
            toast.error(response.error)
        } else {
            toast.success(response?.message)
        }
    }

    return (
        <>
            <NavMenu/>
            <main className="flex-grow container mx-auto px-4 py-8">
                <h1 className="text-4xl font-bold mb-8 text-center">Our Menu</h1>
                {filteredItems.length <= 0 ? (
                    <MenuSkeleton/>
                ) : (
                    <>
                        <Tabs defaultValue="all" className="mb-8">
                            <TabsList className="grid w-full grid-cols-4">
                                {categories.map((category) => (
                                    <TabsTrigger
                                        key={category}
                                        value={category}
                                        onClick={() => setActiveCategory(category)}
                                    >
                                        {category.charAt(0).toUpperCase() + category.slice(1)}
                                    </TabsTrigger>
                                ))}
                            </TabsList>
                        </Tabs>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredItems.map((item, index) => (
                                <Card key={index}>
                                    <CardHeader>
                                        <CardTitle>{item.name}</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-2xl font-bold">€{item.price.toFixed(2)}</p>
                                    </CardContent>
                                    <CardFooter>
                                        <Button className="w-full" onClick={() => addToCart(item)}>Add to
                                            Cart</Button>
                                    </CardFooter>
                                </Card>
                            ))}
                        </div>
                    </>
                )
                }
            </main>
        </>
    )
}