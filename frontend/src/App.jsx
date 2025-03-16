//import logo from "./logo.svg";
import "./App.css";
import ExerciseList from "./components/ExerciseList.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route
      path="/app"
      element={<div className="App">
        <ExerciseList />
      </div>}>
    
    </Route>
    </Routes>
    </BrowserRouter>
  );
  
}

export default App;
