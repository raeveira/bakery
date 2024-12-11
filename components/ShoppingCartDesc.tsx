'use client'

import { useEffect, useState } from "react"
import { Minus, Plus } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { getCartItems } from "@/app/actions/getCartItems"
import { toast } from "sonner"
import { CartItem } from "@/lib/types/cartItem"
import {updateCartItemQuantityDB} from "@/app/actions/updateCartItemQuantity";
import {removeCartItemDB} from "@/app/actions/removeCartItem";
import Image from "next/image";

export default function ShoppingCartDesc() {
    const [cartItems, setCartItems] = useState<CartItem[]>([])

    const updateCart = async () => {
        const response = await getCartItems()
        if(response) {
            if ('error' in response) {
                toast.error(response.error)
            } else if (Array.isArray(response) && response.length === 0) {
                setCartItems([])
            } else {
                setCartItems(response)
            }
        }
    }

    useEffect(() => {
        updateCart()
    }, [])

    const onUpdateQuantity = async (id: string, quantity: number) => {
        const maxQuantity = 40;
        if (quantity > maxQuantity) {
            toast.error(`You cannot have more than ${maxQuantity} of this item in your cart`);
            return;
        }

        setCartItems(prevItems =>
            prevItems.map(item =>
                item.id === id ? { ...item, quantity } : item
            )
        );

        const response = await updateCartItemQuantityDB(id, quantity);
        if ('error' in response) {
            toast.error(response.error);
        } else {
            toast.success(response.message);
        }
    };
    const onRemoveItem = async (id: string) => {
        setCartItems(prevItems => prevItems.filter(item => item.id !== id))
        const response = await removeCartItemDB(id)
        if ('error' in response) {
            toast.error(response.error)
        } else {
            toast.success(response.message)
        }
    }

    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0)
    const totalPrice = cartItems.reduce((sum, item) => sum + item.quantity * item.product.price, 0)

    return (
        <div className="flex flex-col h-[calc(100vh-4rem)] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                    <span className="text-xl font-bold">{totalItems}</span>
                </div>
                <span className="text-lg">Items in cart</span>
            </div>

            <div className="flex-grow space-y-6 overflow-y-auto h-[calc(100vh-16rem)]">
                {cartItems.length > 0 ? (
                    cartItems.map((item) => (
                        <div key={item.id} className="flex flex-row space-y-4 sm:flex-col sm:justify-between sm:items-center">
                            <div className={"flex-row flex space-x-2 w-full"}>
                                <div className={'h-[100px] w-[100px] relative'}>
                                     <Image src={item.product.image} alt={item.product.name} fill={true} className={"rounded-[15px] object-cover"} />
                                </div>

                                <div className={"flex-1 flex-grow flex flex-col"}>
                                <h3 className="text-lg font-semibold">{item.product.name}</h3>
                                <p className="text-lg font-semibold">€{item.product.price.toFixed(2)}</p>
                                </div>
                            </div>
                            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
                                <div className="flex items-center gap-2">
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        className="h-8 w-8"
                                        onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                                    >
                                        <Minus className="h-4 w-4"/>
                                    </Button>
                                    <Input
                                        type="number"
                                        min="1"
                                        value={item.quantity}
                                        onChange={(e) => onUpdateQuantity(item.id, parseInt(e.target.value) || 1)}
                                        className="w-16 h-8 text-center"
                                    />
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        className="h-8 w-8"
                                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                                    >
                                        <Plus className="h-4 w-4"/>
                                    </Button>
                                </div>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => onRemoveItem(item.id)}
                                    className="text-red-500 hover:text-red-600 hover:bg-red-50 px-0"
                                >
                                    Remove
                                </Button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center text-gray-500">
                        Your cart is empty
                    </div>
                )}
            </div>

            <div className="mt-auto pt-6">
                <div className="flex justify-between items-center mb-4">
                    <span className="text-xl font-bold">Total:</span>
                    <span className="text-xl font-bold">€{totalPrice.toFixed(2)}</span>
                </div>
                <Button className="w-full bg-black text-white hover:bg-gray-800">
                    Checkout
                </Button>
            </div>
        </div>
    )
}