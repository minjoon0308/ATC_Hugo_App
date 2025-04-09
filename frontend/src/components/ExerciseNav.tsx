import React from "react"
import { useNavigate } from "react-router-dom"

interface Props{
    savedExercises: []
    workout: number
    current : number
}
export default function ExerciseNav(props: Props){
    const navigate = useNavigate()
    console.log("TIIII", props.savedExercises)
    return(
        <div className="flex gap-2 justify-center">
            {props.savedExercises.map((exercise, index)=>
                (
                    
                    <a key={index} href={`/workout/${props.workout}/step/${index}`}
                    className={`${props.current==index ? "bg-blue-500":"bg-blue-gray-500"} text-white px-2 rounded-lg hover:text-white hover:decoration-pink-500` } >{index+1} - {exercise.exercise.name} </a>
                )
                
            )}
        </div>
    )
}