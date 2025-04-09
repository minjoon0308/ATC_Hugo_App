import React, {useState, useEffect} from "react";
import {getUserWorkouts} from "./api/api.jsx";
import Add from "./components/Add";
import Box from "./components/Box"

export default function Workouts(){
    const [workouts, setWorkouts] = useState<any>([])
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        const fetchWorkouts = async () => {
            try {
                const response = await getUserWorkouts(); 
                if (!response.data.length){
                    setWorkouts([{id:"1", name: "Add an Exercise!", desc: "Add an exercise using the button on the bottom right"},]); 
                }
                else setWorkouts(response.data); 
            } catch (error) {
                setWorkouts([ {id:"2", name: "Error Fetching Workouts", desc: "Please logout and login again."}])
                console.error('Error fetching workouts:', error);
            }
        }; 
        fetchWorkouts();
    }, [refresh])
    return(
        <div>
            <h1>Workouts</h1>
            <div className="flex flex-col justify-center items-center h-full k">
                {workouts.map((workout) => (
                    <Box {...workout} setRefresh={setRefresh} />
                ))}
            </div>
            <Add link="create"/>
        </div>
    )
}