import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Home from "./page/Home/Home";
import Navigation from "./components/Navigation/Navigation";
import Favorite from "./page/Favorite/Favorite";
import React from "react";

function App() {
  return (
    <div className="App">
        <BrowserRouter>
            <Navigation />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/favorite" element={ <Favorite/> } />
            </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
