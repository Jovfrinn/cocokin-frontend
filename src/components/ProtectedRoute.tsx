import { Navigate, Outlet } from "react-router-dom"

export default function ProtectedRoute() {
    const currentUser = localStorage.getItem("currentUser")    
    const token = localStorage.getItem("access_token")

    if(!currentUser || !token){
        return <Navigate to="/login" replace />
    }

    return <Outlet />
}