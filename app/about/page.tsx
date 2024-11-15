import Image from 'next/image'
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card"
import NavMenu from "@/components/NavMenu";
import React from "react";

export default function AboutPage() {
    return (
        <>
            <NavMenu/>
            <main className="flex-grow container mx-auto px-4 py-8">
                <h1 className="text-4xl font-bold mb-8 text-center">About Sweet Delights Bakery</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                    <div>
                        <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
                        <p className="mb-4">
                            Sweet Delights Bakery was founded in 2010 by passionate bakers, Emma and James Thompson.
                            What started as a small family-run shop has grown into a beloved local institution, known
                            for our commitment to quality and traditional baking methods.
                        </p>
                        <p>
                            We take pride in using only the finest ingredients, sourced locally whenever possible, to
                            create our delectable range of breads, pastries, and cakes. Our recipes have been perfected
                            over years, blending time-honored techniques with innovative flavors.
                        </p>
                    </div>
                    <div className="relative flex justify-end">
                        <Image
                            src="/images/bakery_building.jpg"
                            alt="Sweet Delights Bakery storefront"
                            width={480}
                            height={256}
                            className="rounded-lg"
                        />
                    </div>
                </div>

                <h2 className="text-2xl font-semibold mb-6 text-center">Our Values</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    {[
                        {
                            title: "Quality",
                            description: "We never compromise on the quality of our ingredients or our finished products."
                        },
                        {
                            title: "Community",
                            description: "We're proud to be a part of our local community and strive to give back whenever we can."
                        },
                        {
                            title: "Sustainability",
                            description: "We're committed to reducing our environmental impact through sustainable practices."
                        }
                    ].map((value, index) => (
                        <Card key={index}>
                            <CardHeader>
                                <CardTitle>{value.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p>{value.description}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <h2 className="text-2xl font-semibold mb-6 text-center">Meet Our Team</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                        {name: "Dylan Backes", role: "Co-Founder & Head Baker"},
                        {name: "Vincent Steegh", role: "Co-Founder & Business Manager"},
                        {name: "Mika Schmelling", role: "Pastry Chef"},
                        {name: "Mouaid Sayem", role: "Baker"},
                    ].map((member, index) => (
                        <Card key={index}>
                            <CardHeader>
                                <CardTitle>{member.name}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p>{member.role}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </main>
        </>
    )
}