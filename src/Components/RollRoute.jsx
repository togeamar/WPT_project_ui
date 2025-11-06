import { Navigate } from "react-router-dom";

export function RollRoute({children,allowedtype}){
    const token=localStorage.getItem('token');
    const type=localStorage.getItem('type');

    if(!token) return <Navigate to="/"/>;
    if(type!==allowedtype) return <Navigate to="/"/>;

    return children;
}