"use client"

import { useState } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"

export type MenuItem = {
    id?: string
    name: string
    price: number
    category: string
    createdAt?: Date
    updatedAt?: Date
}

export const ProductsView = ({ menuItems }: { menuItems: MenuItem[] }) => {
    const [items, setItems] = useState<MenuItem[]>(menuItems)
    const [editingItem, setEditingItem] = useState<MenuItem | null>(null)

    const handleEdit = (item: MenuItem) => {
        setEditingItem(item)
    }

    const handleDelete = (id: string | undefined) => {
        if (id) {
            setItems(items.filter(item => item.id !== id))
        }
    }

    const handleSave = (updatedItem: MenuItem) => {
        setItems(items.map(item => item.id === updatedItem.id ? updatedItem : item))
        setEditingItem(null)
    }

    return (
        <ScrollArea className="h-full">
            <main className="p-6">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-amber-500">Products Management</h2>
                    <Button className="bg-amber-600 hover:bg-amber-700 text-white">Add New Product</Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {items.map((item) => (
                        <Card key={item.id} className="bg-stone-800 border-stone-700">
                            <CardHeader>
                                <CardTitle className="text-amber-400">{item.name}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-amber-100">Price: ${item.price.toFixed(2)}</p>
                                <p className="text-amber-100">Category: {item.category}</p>
                                {item.createdAt && (
                                    <p className="text-xs text-stone-400">
                                        Created: {item.createdAt.toLocaleDateString()}
                                    </p>
                                )}
                            </CardContent>
                            <CardFooter className="flex justify-between">
                                <Button variant="outline" className="text-amber-400 border-amber-400" onClick={() => handleEdit(item)}>Edit</Button>
                                <Button variant="destructive" onClick={() => handleDelete(item.id)}>Delete</Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </main>

            <Dialog open={editingItem !== null} onOpenChange={() => setEditingItem(null)}>
                <DialogContent className="bg-stone-800 text-amber-100">
                    <DialogHeader>
                        <DialogTitle className="text-amber-500">Edit Product</DialogTitle>
                    </DialogHeader>
                    {editingItem && (
                        <form onSubmit={(e) => {
                            e.preventDefault()
                            handleSave(editingItem)
                        }}>
                            <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="name" className="text-right">
                                        Name
                                    </Label>
                                    <Input
                                        id="name"
                                        value={editingItem.name}
                                        onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                                        className="col-span-3 bg-stone-700 text-amber-100 border-stone-600"
                                    />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="price" className="text-right">
                                        Price
                                    </Label>
                                    <Input
                                        id="price"
                                        type="number"
                                        value={editingItem.price}
                                        onChange={(e) => setEditingItem({ ...editingItem, price: parseFloat(e.target.value) })}
                                        className="col-span-3 bg-stone-700 text-amber-100 border-stone-600"
                                    />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="category" className="text-right">
                                        Category
                                    </Label>
                                    <Input
                                        id="category"
                                        value={editingItem.category}
                                        onChange={(e) => setEditingItem({ ...editingItem, category: e.target.value })}
                                        className="col-span-3 bg-stone-700 text-amber-100 border-stone-600"
                                    />
                                </div>
                            </div>
                            <div className="flex justify-end">
                                <Button type="submit" className="bg-amber-600 hover:bg-amber-700 text-white">Save Changes</Button>
                            </div>
                        </form>
                    )}
                </DialogContent>
            </Dialog>
        </ScrollArea>
    )
}

