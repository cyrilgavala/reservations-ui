import {useContext, useState} from "react";
import {Link} from "react-router-dom";
import {UserContext} from "../../UserDetails";

export const MenuWrapper = () => {

    const {user} = useContext(UserContext)
    const [show, setShow] = useState(false)

    return <div id="menu-wrapper">
        <button id="menu-toggle" className={show ? "open" : ""} onClick={() => setShow(!show)}/>
        <nav id="menu-items">
            <Link to="/my-reservations">
                <i className="fa-solid fa-calendar-check"/> {"ADMIN" === user.rol ? "All reservations" : "My reservations"}
            </Link>
            <Link to="/calendar"><i className="fa-solid fa-calendar-days"/> Calendar</Link>
            <Link to="/"><i className="fa-solid fa-right-from-bracket"></i> Logout</Link>
        </nav>
    </div>
}