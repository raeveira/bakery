'use client'

import React, {useState} from 'react'
import {Button} from "@/components/ui/button"
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card"
import {Tabs, TabsList, TabsTrigger} from "@/components/ui/tabs"
import NavMenu from "@/components/NavMenu";

const menuItems = [
    {id: 1, name: 'Croissant', price: 2.50, category: 'pastries'},
    {id: 2, name: 'Baguette', price: 3.00, category: 'bread'},
    {id: 3, name: 'Chocolate Chip Cookie', price: 1.50, category: 'cookies'},
    {id: 4, name: 'Sourdough Loaf', price: 5.00, category: 'bread'},
    {id: 5, name: 'Blueberry Muffin', price: 2.75, category: 'pastries'},
    {id: 6, name: 'Cinnamon Roll', price: 3.50, category: 'pastries'},
    {id: 7, name: 'Oatmeal Raisin Cookie', price: 1.50, category: 'cookies'},
    {id: 8, name: 'Whole Wheat Bread', price: 4.50, category: 'bread'},
    {id: 9, name: 'Apple Turnover', price: 3.25, category: 'pastries'},
    {id: 10, name: 'Macaroon', price: 2.00, category: 'cookies'},
    {id: 11, name: 'Focaccia', price: 4.00, category: 'bread'},
    {id: 12, name: 'Eclair', price: 3.75, category: 'pastries'},
]

const categories = ['all', 'bread', 'pastries', 'cookies']

export default function MenuPage() {
    const [activeCategory, setActiveCategory] = useState('all')

    const filteredItems = activeCategory === 'all'
        ? menuItems
        : menuItems.filter(item => item.category === activeCategory)

    return (
        <>
            <NavMenu/>
            <main className="flex-grow container mx-auto px-4 py-8">
                <h1 className="text-4xl font-bold mb-8 text-center">Our Menu</h1>

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
                    {filteredItems.map((item) => (
                        <Card key={item.id}>
                            <CardHeader>
                                <CardTitle>{item.name}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-2xl font-bold">${item.price.toFixed(2)}</p>
                            </CardContent>
                            <CardFooter>
                                <Button className="w-full">Add to Cart</Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </main>
        </>
    )
}