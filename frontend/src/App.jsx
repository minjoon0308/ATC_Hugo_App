//import logo from "./logo.svg";
import ExerciseList from "./components/ExerciseList.jsx";
import Nav from "./components/Nav.js";
import Add from "./components/Add"
import AddExercise from "./components/AddExercise"
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route
        path="/app"
        element={<div className="App">
          <Nav/>
          <div className="Content">          
            <ExerciseList />
            <Add/>
          </div>
        </div>}>
      </Route>
      <Route
        path="/create"
        element={<div className="create">
          <Nav/>
          <div className="Content">      
            <h1>Name of Your Workout</h1>
            <AddExercise/>
          </div>
        </div>}>
      
      </Route>
    </Routes>
    </BrowserRouter>
  );
  
}

export default App;
