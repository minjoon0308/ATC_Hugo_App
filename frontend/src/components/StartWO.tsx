"use client";

import React from "react";
import { useNavigate } from "react-router-dom";


export default function StartWO(){    
    const navigate = useNavigate();

    return(
        <div className="fixed bottom-5 right-5 text-4xl ">
            <button onClick={()=> {navigate("/workout")}}
            className="bg-blue-gray-300/80 py-7 cursor-pointer duration-300 ease-in hover:bg-blue-gray-500 text-white ">Start Workout</button>
        </div>
    )   
}