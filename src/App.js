import 'react-calendar/dist/Calendar.css';
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Calendar from "./routes/Calendar";
import MyReservations from "./routes/MyReservations";
import React from "react";
import LoginPage from "./routes/LoginPage";
import {UserProvider} from "./UserDetails";

const App = () => {
    return <UserProvider>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LoginPage/>}/>
                <Route path="/calendar" element={<Calendar/>}/>
                <Route path="/my-reservations" element={<MyReservations/>}/>
            </Routes>
        </BrowserRouter>
    </UserProvider>
}

export default App;