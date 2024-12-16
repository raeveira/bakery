import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import AdminDashboard from "@/components/AdminDashboard"

const AdminPage = async () => {
    const session = await auth()

    if (!session || session.user.role !== "admin") {
        redirect("/")
    }

    // flag = GILDE{WEBSITE}

    return <AdminDashboard />
}

export default AdminPage
