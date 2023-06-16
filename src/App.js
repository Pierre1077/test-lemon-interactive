import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Home from "./page/Home/Home";
import Navigation from "./components/Navigation/Navigation";
import Favorite from "./page/Favorite/Favorite";
import React from "react";
import Detail from "./page/Detail/Detail";

function App() {
  return (
    <div className="App">
        <BrowserRouter>
            <Navigation />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/favorite" element={ <Favorite/> } />
                <Route path="/detail" element={ <Detail/> } />
            </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
