'use client'

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Phone, Mail, Clock } from 'lucide-react'
import NavMenu from "@/components/NavMenu"
import Footer from "@/components/Footer"

export default function ContactPage() {
    return (
        <>
            <NavMenu />
            <main className="flex-grow container mx-auto px-4 py-8">
                <h1 className="text-4xl font-bold mb-8 text-center">Contact Us</h1>

                <Card className="max-w-2xl mx-auto">
                    <CardHeader>
                        <CardTitle className="text-2xl">Contact Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-2">
                            <h3 className="text-xl font-semibold">Our Location</h3>
                            <div className="flex items-center space-x-2">
                                <MapPin className="h-5 w-5"/>
                                <p>123 Bakery Street, Sweetville, SW 12345</p>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Phone className="h-5 w-5"/>
                                <p>(555) 123-4567</p>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Mail className="h-5 w-5"/>
                                <p>info@sweetdelightsbakery.com</p>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <h3 className="text-xl font-semibold">Business Hours</h3>
                            <div className="flex items-center space-x-2">
                                <Clock className="h-5 w-5"/>
                                <div>
                                    <p>Monday - Friday: 7:00 AM - 7:00 PM</p>
                                    <p>Saturday: 8:00 AM - 6:00 PM</p>
                                    <p>Sunday: 9:00 AM - 3:00 PM</p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </main>
            <Footer />
        </>
    )
}