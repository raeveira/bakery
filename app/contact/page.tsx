'use client'

import React, {useState} from 'react'
import {Button} from "@/components/ui/button"
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {Textarea} from "@/components/ui/textarea"
import {MapPin, Phone, Mail, Clock} from 'lucide-react'
import NavMenu from "@/components/NavMenu";

export default function ContactPage() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        // Reset form fields
        setName('')
        setEmail('')
        setMessage('')
    }

    return (
        <>
            <NavMenu/>
            <main className="flex-grow container mx-auto px-4 py-8">
                <h1 className="text-4xl font-bold mb-8 text-center">Contact Us</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>Send us a message</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Name</Label>
                                    <Input
                                        id="name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="message">Message</Label>
                                    <Textarea
                                        id="message"
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        required
                                    />
                                </div>
                                <Button type="submit" className="w-full">Send Message</Button>
                            </form>
                        </CardContent>
                    </Card>

                    <div className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Our Location</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2">
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
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Business Hours</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <div className="flex items-center space-x-2">
                                    <Clock className="h-5 w-5"/>
                                    <div>
                                        <p>Monday - Friday: 7:00 AM - 7:00 PM</p>
                                        <p>Saturday: 8:00 AM - 6:00 PM</p>
                                        <p>Sunday: 9:00 AM - 3:00 PM</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </main>
        </>
    )
}