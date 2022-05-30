import 'react-calendar/dist/Calendar.css';
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import AllReservations from "./routes/AllReservations";
import MyReservations from "./routes/MyReservations";
import React from "react";

const App = () => {
    return <BrowserRouter>
        <Routes>
            <Route path="/" element={<AllReservations/>}/>
            <Route path="/my-reservations" element={<MyReservations/>}/>
        </Routes>
    </BrowserRouter>
}

export default App;