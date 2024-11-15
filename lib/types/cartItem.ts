export type CartItem = ({
    product: {
        id: string
        createdAt: Date
        updatedAt: Date
        name: string
        price: number
        category: string
    }
} & {
    id: string
    cartId: string
    productId: string
    quantity: number
    createdAt: Date
    updatedAt: Date
})