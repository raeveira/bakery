import {useEffect, useState} from "react";
import {getAllOrders} from "@/app/actions/getAllOrders";

type Order = {
    id: string;
    userId: string;
    product: {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        price: number;
        image: string;
        category: string;
    };
    Receipts: {
        id: string;
        userId: string;
        createdAt: Date;
        updatedAt: Date;
        orderId: string;
        orderDate: Date;
        refunded: boolean;
    }[]
}

export const OrdersView = () => {
            const [orders, setOrders] = useState<Order[]>([]);

            useEffect(() => {
                const fetchOrders = async () => {
                    await getAllOrders().then((data) => {
                        console.log(data);
                        if (data) {
                            setOrders(data);
                        } else {
                            setOrders([]);
                        }
                    });
                }

                fetchOrders();
            }, []);

            return (
                <main className="p-6">
                    <h2 className="text-2xl font-bold text-amber-500">Orders Management</h2>
                    {orders.length > 0 ? (
                        <table className="w-full mt-6 text-white">
                            <thead>
                            <tr>
                                <th className="text-left">Order ID</th>
                                <th className="text-left">Customer ID</th>
                                <th className="text-left">Receipt ID</th>
                                <th className="text-left">Refunded</th>
                            </tr>
                            </thead>
                            <tbody>
                            {orders.map((order) => (
                                <tr key={order.id}>
                                    <td>{order.id}</td>
                                    <td>{order.userId}</td>
                                    <td>${order.Receipts[0].id}</td>
                                    <td>{order.Receipts[0].refunded.toString()}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    ) : (
                        <p className={'text-white'}>No orders found</p>
                    )}
                </main>
            )
        }
;