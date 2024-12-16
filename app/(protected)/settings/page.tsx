"use client"

import React, { useEffect, useState } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import NavMenu from "@/components/NavMenu"
import getSessionStatus from "@/app/actions/getSessionStatus"
import { updateUserDB } from "@/app/actions/updateUser"
import { checkPassword } from '@/app/actions/checkPassword'
import Footer from "@/components/Footer";

export default function SettingsPage() {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')

    async function fetchSession() {
        const sessionData = await getSessionStatus()
        if (sessionData && sessionData.user) {
            setUsername(sessionData.user.name || '')
            setEmail(sessionData.user.email || '')
        }
    }

    async function handleSaveChanges() {
        if (!username && !email) {
            alert('Please provide either a username or an email to update.')
            return
        }

        try {
            await updateUserDB(username, email)
            alert('User updated successfully')
        } catch {
            alert('Failed to update user')
        }
    }

    async function handleChangePassword() {
        const currentPassword = (document.getElementById('current-password') as HTMLInputElement).value
        const newPassword = (document.getElementById('new-password') as HTMLInputElement).value
        const confirmPassword = (document.getElementById('confirm-password') as HTMLInputElement).value

        if (!currentPassword || !newPassword || !confirmPassword) {
            alert('Please fill in all password fields.')
            return
        }

        if (newPassword !== confirmPassword) {
            alert('New password and confirm password do not match.')
            return
        }

        try {
            await checkPassword(email, currentPassword) // Verify the password
            await updateUserDB(username, email, newPassword)
            alert('Password changed successfully')
        } catch {
            alert('Failed to change password')
        }
    }

    useEffect(() => {
        fetchSession().then()
    }, [])

    return (
        <>
            <NavMenu />
            <main className="flex-grow container mx-auto px-4 py-8">
                <h1 className="text-4xl font-bold mb-8 text-center">Settings</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                    <div>
                        <h2 className="text-2xl font-semibold mb-4">Account Information</h2>
                        <Card>
                            <CardContent className="pt-6">
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="username">Username</Label>
                                        <Input id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="email">Email</Label>
                                        <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                                    </div>
                                    <Button onClick={handleSaveChanges}>Save Changes</Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                    <div>
                        <h2 className="text-2xl font-semibold mb-4">Password</h2>
                        <Card>
                            <CardContent className="pt-6">
                                <div className="space-y-4">
                                    <input type="text" name="fakeusernameremembered" style={{ display: 'none' }} />
                                    <input type="password" name="fakepasswordremembered" style={{ display: 'none' }} />
                                    <div className="space-y-2">
                                        <Label htmlFor="current-password">Current Password</Label>
                                        <Input id="current-password" type="password" autoComplete="new-password" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="new-password">New Password</Label>
                                        <Input id="new-password" type="password" autoComplete="new-password" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="confirm-password">Confirm New Password</Label>
                                        <Input id="confirm-password" type="password" autoComplete="new-password" />
                                    </div>
                                    <Button onClick={handleChangePassword}>Change Password</Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </main>
            <Footer/>
        </>
    )
}