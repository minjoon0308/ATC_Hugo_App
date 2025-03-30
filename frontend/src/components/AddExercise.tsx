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
        <div className="block ">
            <button onClick={() => navigate("/create")}
            className=" w-[70vw]">+</button>
        </div>
    )   
}