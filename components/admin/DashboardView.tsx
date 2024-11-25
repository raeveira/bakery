import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import React from "react";

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

export const DashboardView = () => (
    // Your existing dashboard content
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
                        <div className="h-full bg-amber-500 rounded-full" style={{width: "52%"}}/>
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
                <CardContent className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={lineChartData}>
                            <CartesianGrid strokeDasharray="3 3"/>
                            <XAxis dataKey="name"/>
                            <YAxis/>
                            <Tooltip/>
                            <Line type="monotone" dataKey="value" stroke="#f59e0b"/>
                        </LineChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>
            <Card className="bg-stone-800 border-stone-700">
                <CardHeader>
                    <CardTitle className="text-amber-500">Daily Orders</CardTitle>
                </CardHeader>
                <CardContent className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={barChartData}>
                            <CartesianGrid strokeDasharray="3 3"/>
                            <XAxis dataKey="name"/>
                            <YAxis/>
                            <Tooltip/>
                            <Bar dataKey="value" fill="#f59e0b"/>
                        </BarChart>
                    </ResponsiveContainer>
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
);