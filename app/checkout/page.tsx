'use client'
import CheckoutForm from './checkout-form'
import OrderSummary from './order-summary'
import { ChevronLeft} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

export default function CheckoutPage() {

    const router = useRouter()

    const handleBack = () => {
        router.push('/')
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <Button onClick={handleBack} className={"absolute top-2 left-4"} variant={"ghost"}>
                <ChevronLeft />
            </Button>
            <h1 className="text-3xl font-bold mb-8">Checkout</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <CheckoutForm />
                <OrderSummary />
            </div>
        </div>
    )
}

