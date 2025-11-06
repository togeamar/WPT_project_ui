import { Outlet,Navigate  } from "react-router-dom";
import { getToken } from "../services/tokenservice"



export function PrivateRoute(){
    const token=getToken();
    if(token){
        return <Outlet/>
    }
    else{
        return <Navigate to={"/"}/>
    }
}