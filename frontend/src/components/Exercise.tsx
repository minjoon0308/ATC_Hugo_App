import React, {useState, useEffect} from "react";


interface BoxProps{
    description: object;
    duration: number;
    difficulty: string;
    target_muscle: string;
    primary_classification: string;
    body_region: string;
    primary_equipment: string;
    short_demo: string;
    demo: string;
    id: number;
    index: number;
    name: string;
    numReps: number;
    rest: number;

}

export default function Exercise(props: BoxProps){
    return(
        <>
        
        {props.short_demo && (
            <div className="w-full flex justify-center my-4">
                <iframe
                    className="rounded-lg"
                    width="100%"
                    height="315"
                    src={`https://www.youtube.com/embed/${props.short_demo.split("shorts/")[1]?.split("?")[0]}?autoplay=0&rel=0&controls=1`}                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                ></iframe>
            </div>
        )}
        </>
    )
}