import React from "react";

interface BoxProps{
    desc: string;
    name: string;
}

export default function Box(props: BoxProps){
    return(
        <div className="w-[90vw] flex flex-col rounded-xl bg-slate-200 content-center  place-content-center justify-center items-center m-5 pt-10 shadow-lg outline outline-black/5 ">
           <h2 className="mb-4 text-4xl font-semibold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">{props.name}</h2> 
            <p className="mb-6 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">{props.desc}</p>
        </div>
    )
}