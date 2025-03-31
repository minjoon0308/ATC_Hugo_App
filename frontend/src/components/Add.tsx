"use client";

import React from "react";
import { useNavigate } from "react-router-dom";


export default function Nav(){    
    const navigate = useNavigate();
    return(
        <div className="fixed bottom-5 right-5 text-4xl ">
            <button onClick={() => navigate("/create")}
            className="bg-slate-500 py-7 cursor-pointer hover:bg-slate-600 text-white">+</button>
        </div>
    )   
}