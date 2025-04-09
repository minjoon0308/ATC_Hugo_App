"use client";

import React from "react";
import { useNavigate } from "react-router-dom";

interface AddProps{
    link: string
}

export default function Nav(props:AddProps){    
    const navigate = useNavigate();
    const create = () => {
        localStorage.removeItem("workoutId");
        localStorage.removeItem("workoutName");
        localStorage.removeItem("selectedExercises");
        navigate(`/${props.link}`);
    }
    return(
        <div className="fixed bottom-5 right-5 text-4xl ">
            <button onClick={create}
            className="bg-slate-500 py-7 cursor-pointer hover:bg-slate-600 text-black">+</button>
        </div>
    )   
}