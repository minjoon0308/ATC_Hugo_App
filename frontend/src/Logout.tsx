import React, {useEffect} from "react";
import { useNavigate } from "react-router-dom";

export default function Logout(){
    const navigate = useNavigate();

    useEffect(()=>{
        localStorage.removeItem('authToken')
        navigate('/auth/login')
    }, [navigate])
    return <div>Logging out...</div>;
}