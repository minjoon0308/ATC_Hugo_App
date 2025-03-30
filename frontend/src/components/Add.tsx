"use client";

import React from "react";
import { useNavigate } from "react-router-dom";

interface BoxProps{
    place: number;
    color: string;
}

export default function Nav(props: BoxProps){    
    const navigate = useNavigate();
    return(
        <div className="fixed bottom-4 right-4">
            <button onClick={() => navigate("/create")}
            className="bg-black text-white">+</button>
        </div>
    )   
}