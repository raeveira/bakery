'use client'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getCartItems } from "@/app/actions/getCartItems"
import { useEffect, useState } from "react"
import { CartItem } from "@/lib/types/cartItem";

export default function OrderSummary() {
    const [orderItems, setOrderItems] = useState<CartItem[]>([])
    const subtotal = orderItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
    const tax = subtotal * 0.21
    const total = subtotal + tax

    useEffect(() => {
        const fetchCartItems = async () => {
            const response = await getCartItems()
            if (response) {
                if ('error' in response) {
                    console.error(response.error)
                } else {
                    setOrderItems(response)
                }
            }
        }

        fetchCartItems().then()
    }, []);

    return (
        <Card>
            <CardHeader>
                <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="mb-4">
                    <div className="grid grid-cols-12 w-full font-semibold mb-2 text-sm">
                        <span className="col-span-6">Item</span>
                        <span className="col-span-2 text-center">Quantity</span>
                        <span className="col-span-2 text-right">Unit Price</span>
                        <span className="col-span-2 text-right">Total</span>
                    </div>
                    <ul className="space-y-2">
                        {orderItems.map((item, index) => (
                            <li key={index} className="grid grid-cols-12 w-full">
                                <span className="col-span-6">{item.product.name}</span>
                                <span className="col-span-2 text-center">{item.quantity}x</span>
                                <span className="col-span-2 text-right">€{item.product.price.toFixed(2)}</span>
                                <span className="col-span-2 text-right">€{(item.product.price * item.quantity).toFixed(2)}</span>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="mt-4 pt-4 border-t">
                    <h3 className="font-semibold text-lg mb-2">Order Total</h3>
                    <div className="flex justify-between">
                        <span>Subtotal</span>
                        <span>€{subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Tax (21%)</span>
                        <span>€{tax.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between font-bold mt-2">
                        <span>Total</span>
                        <span>€{total.toFixed(2)}</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

