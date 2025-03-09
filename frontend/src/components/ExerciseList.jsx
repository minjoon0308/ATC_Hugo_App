import React, { useState, useEffect } from "react";
import { getExercises } from "../api.jsx";

const ExerciseList = () => {
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    getExercises().then((response) => setExercises(response.data));
  }, []);

  return (
    <div>
      <h1>Exercises</h1>
      <ul>
        {exercises.map((exercise) => (
          <li key={exercise.id}>{exercise.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default ExerciseList;
