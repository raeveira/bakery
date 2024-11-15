'use client'

import React from 'react'
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"

export default function MenuSkeleton() {
    return (
        <main className="flex-grow container mx-auto px-4 py-8 col-span-3">
            <Tabs defaultValue="all" className="mb-8">
                <TabsList className="grid w-full grid-cols-4">
                    {[...Array(4)].map((_, index) => (
                        <TabsTrigger key={index} value={`category-${index}`} disabled>
                            <Skeleton className="h-4 w-20" />
                        </TabsTrigger>
                    ))}
                </TabsList>
            </Tabs>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, index) => (
                    <Card key={index} className="overflow-hidden">
                        <CardHeader>
                            <Skeleton className="h-6 w-3/4" />
                        </CardHeader>
                        <CardContent>
                            <Skeleton className="h-8 w-1/4" />
                        </CardContent>
                        <CardFooter>
                            <Skeleton className="h-10 w-full" />
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </main>
    )
}