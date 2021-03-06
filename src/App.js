import 'react-calendar/dist/Calendar.css';
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Calendar from "./pages/Calendar";
import MyReservations from "./pages/MyReservations";
import React from "react";
import LoginPage from "./pages/LoginPage";
import {UserProvider} from "./UserDetails";
import RegisterPage from "./pages/RegisterPage";
import Footer from "./widgets/Footer";

const App = () => {
    return <UserProvider>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LoginPage/>}/>
                <Route path="/register" element={<RegisterPage/>}/>
                <Route path="/calendar" element={<Calendar/>}/>
                <Route path="/reservations" element={<MyReservations/>}/>
            </Routes>
        </BrowserRouter>
        <Footer/>
    </UserProvider>
}

export default App;