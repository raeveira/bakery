"use client"

import React, {useState, useEffect} from "react"
import {Search} from 'lucide-react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {Input} from "@/components/ui/input"
import {Button} from "@/components/ui/button"
import {ScrollArea} from "@/components/ui/scroll-area"
import {getAllProductsDB} from "@/utils/db";
import {DashboardView} from "@/components/admin/DashboardView";
import {CustomersView} from "@/components/admin/CustomersView";
import {AnalyticsView} from "@/components/admin/AnalyticsView";
import {ProductsView} from "@/components/admin/ProductsView";
import {OrdersView} from "@/components/admin/OrdersView";

interface MenuItem {
    id: string
    name: string
    category: string
    price: number
    discount?: number
}

export default function AdminDashboard() {
    const [activeView, setActiveView] = useState("dashboard");
    const [menuItems, setMenuItems] = useState<MenuItem[]>([])
    const [categories, setCategories] = useState<string[]>([])

    useEffect(() => {
        getAllProductsDB().then((data: MenuItem[]) => {
            if (data) {
                setMenuItems(data)
                setCategories(['all', ...new Set(data.map(item => item.category))])
            }
        })
    }, [])

    return (
        <div className="min-h-screen bg-stone-900 min-w-screen">
            <div className="flex">
                {/* Navigation Sidebar */}
                <div className="hidden lg:flex w-64 flex-col fixed h-screen bg-stone-800 border-r border-stone-700">
                    <div className="p-6">
                        <h2 className="text-2xl font-bold text-amber-500">Tavern Admin</h2>
                    </div>
                    <ScrollArea className="flex-1 px-4">
                        <div className="space-y-2">
                            <Button
                                variant={activeView === "dashboard" ? "default" : "ghost"}
                                className="w-full justify-start text-amber-100"
                                onClick={() => setActiveView("dashboard")}
                            >
                                Dashboard
                            </Button>
                            <Button
                                variant={activeView === "products" ? "default" : "ghost"}
                                className="w-full justify-start text-amber-100"
                                onClick={() => setActiveView("products")}
                            >
                                Products
                            </Button>
                            <Button
                                variant={activeView === "orders" ? "default" : "ghost"}
                                className="w-full justify-start text-amber-100"
                                onClick={() => setActiveView("orders")}
                            >
                                Orders
                            </Button>
                            <Button
                                variant={activeView === "customers" ? "default" : "ghost"}
                                className="w-full justify-start text-amber-100"
                                onClick={() => setActiveView("customers")}
                            >
                                Customers
                            </Button>
                            <Button
                                variant={activeView === "analytics" ? "default" : "ghost"}
                                className="w-full justify-start text-amber-100"
                                onClick={() => setActiveView("analytics")}
                            >
                                Analytics
                            </Button>
                        </div>
                    </ScrollArea>
                </div>

                {/* Main Content */}
                <div className="flex-1 lg:ml-64">
                    {/* Header with Filters */}
                    <header className="bg-stone-800 border-b border-stone-700 p-4">
                        <div className="flex flex-col md:flex-row gap-4 items-center">
                            <div className="relative flex-1">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-stone-400"/>
                                <Input
                                    placeholder="Search products..."
                                    className="pl-10 bg-stone-700 border-stone-600 text-amber-100"
                                />
                            </div>
                            <div className="flex gap-4">
                                <Select>
                                    <SelectTrigger className="w-[180px] bg-stone-700 border-stone-600 text-amber-100">
                                        <SelectValue placeholder="Category"/>
                                    </SelectTrigger>
                                    <SelectContent>
                                        {categories.map((category) => (
                                            <SelectItem key={category} value={category}>
                                                {category}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <Select>
                                    <SelectTrigger className="w-[180px] bg-stone-700 border-stone-600 text-amber-100">
                                        <SelectValue placeholder="Date Range"/>
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="today">Today</SelectItem>
                                        <SelectItem value="week">This Week</SelectItem>
                                        <SelectItem value="month">This Month</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </header>

                    {/* Dashboard Content */}
                    {activeView === "dashboard" && <DashboardView/>}
                    {activeView === "products" && <ProductsView menuItems={menuItems}/>}
                    {activeView === "orders" && <OrdersView/>}
                    {activeView === "customers" && <CustomersView/>}
                    {activeView === "analytics" && <AnalyticsView/>}
                </div>
            </div>
        </div>
    )
}

