"use client"

import React, { useState, useEffect } from "react"
import { Search } from 'lucide-react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BarChart, LineChart } from "recharts"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ScrollArea } from "@/components/ui/scroll-area"
import {getAllProductsDB} from "@/utils/db";

interface MenuItem {
    id: string
    name: string
    category: string
    price: number
    discount?: number
}

export default function AdminDashboard() {
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

    // Sample data for charts
    const lineChartData = [
        { name: "Jan", value: 100 },
        { name: "Feb", value: 120 },
        { name: "Mar", value: 170 },
        { name: "Apr", value: 140 },
        { name: "May", value: 200 },
        { name: "Jun", value: 180 },
    ]

    const barChartData = [
        { name: "Mon", value: 10 },
        { name: "Tue", value: 15 },
        { name: "Wed", value: 8 },
        { name: "Thu", value: 20 },
        { name: "Fri", value: 12 },
        { name: "Sat", value: 18 },
    ]

    return (
        <div className="min-h-screen bg-stone-900">
            <div className="flex">
                {/* Navigation Sidebar */}
                <div className="hidden lg:flex w-64 flex-col fixed h-screen bg-stone-800 border-r border-stone-700">
                    <div className="p-6">
                        <h2 className="text-2xl font-bold text-amber-500">Tavern Admin</h2>
                    </div>
                    <ScrollArea className="flex-1 px-4">
                        <div className="space-y-2">
                            <Button variant="ghost" className="w-full justify-start text-amber-100">Dashboard</Button>
                            <Button variant="ghost" className="w-full justify-start text-amber-100">Products</Button>
                            <Button variant="ghost" className="w-full justify-start text-amber-100">Orders</Button>
                            <Button variant="ghost" className="w-full justify-start text-amber-100">Customers</Button>
                            <Button variant="ghost" className="w-full justify-start text-amber-100">Analytics</Button>
                        </div>
                    </ScrollArea>
                </div>

                {/* Main Content */}
                <div className="flex-1 lg:ml-64">
                    {/* Header with Filters */}
                    <header className="bg-stone-800 border-b border-stone-700 p-4">
                        <div className="flex flex-col md:flex-row gap-4 items-center">
                            <div className="relative flex-1">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-stone-400" />
                                <Input
                                    placeholder="Search products..."
                                    className="pl-10 bg-stone-700 border-stone-600 text-amber-100"
                                />
                            </div>
                            <div className="flex gap-4">
                                <Select>
                                    <SelectTrigger className="w-[180px] bg-stone-700 border-stone-600 text-amber-100">
                                        <SelectValue placeholder="Category" />
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
                                        <SelectValue placeholder="Date Range" />
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
                    <main className="p-6">
                        {/* KPI Cards */}
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            <Card className="bg-stone-800 border-stone-700">
                                <CardHeader className="flex flex-row items-center justify-between pb-2">
                                    <CardTitle className="text-amber-500 text-sm font-medium">Total Sales</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold text-amber-100">1,415</div>
                                    <p className="text-xs text-stone-400">+20.1% from last month</p>
                                </CardContent>
                            </Card>
                            <Card className="bg-stone-800 border-stone-700">
                                <CardHeader className="flex flex-row items-center justify-between pb-2">
                                    <CardTitle className="text-amber-500 text-sm font-medium">Revenue</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold text-amber-100">2,057</div>
                                    <p className="text-xs text-stone-400">+15% from last month</p>
                                </CardContent>
                            </Card>
                            <Card className="bg-stone-800 border-stone-700">
                                <CardHeader className="flex flex-row items-center justify-between pb-2">
                                    <CardTitle className="text-amber-500 text-sm font-medium">Active Products</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold text-amber-100">52%</div>
                                    <div className="mt-4 h-2 w-full bg-stone-700 rounded-full overflow-hidden">
                                        <div className="h-full bg-amber-500 rounded-full" style={{ width: "52%" }} />
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Charts and Tables */}
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-6">
                            <Card className="bg-stone-800 border-stone-700 lg:col-span-2">
                                <CardHeader>
                                    <CardTitle className="text-amber-500">Sales Overview</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <LineChart
                                        data={lineChartData}
                                        categories={["value"]}
                                        index="name"
                                        colors={["amber"]}
                                        className="h-[200px] mt-4"
                                    />
                                </CardContent>
                            </Card>
                            <Card className="bg-stone-800 border-stone-700">
                                <CardHeader>
                                    <CardTitle className="text-amber-500">Daily Orders</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <BarChart
                                        data={barChartData}
                                        categories={["value"]}
                                        index="name"
                                        colors={["amber"]}
                                        className="h-[200px] mt-4"
                                    />
                                </CardContent>
                            </Card>
                        </div>

                        {/* Table */}
                        <Card className="bg-stone-800 border-stone-700 mt-6">
                            <CardHeader>
                                <CardTitle className="text-amber-500">Recent Orders</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead className="text-amber-400">Order</TableHead>
                                            <TableHead className="text-amber-400">Customer</TableHead>
                                            <TableHead className="text-amber-400">Product</TableHead>
                                            <TableHead className="text-amber-400 text-right">Amount</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {[1, 2, 3].map((i) => (
                                            <TableRow key={i}>
                                                <TableCell className="text-amber-100">#{i}001</TableCell>
                                                <TableCell className="text-amber-100">Customer {i}</TableCell>
                                                <TableCell className="text-amber-100">Product {i}</TableCell>
                                                <TableCell className="text-right text-amber-100">${i}00.00</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                    </main>
                </div>
            </div>
        </div>
    )
}

