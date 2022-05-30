import {useState} from "react";
import {Link} from "react-router-dom";

export const MenuWrapper = () => {

    const [show, setShow] = useState(false)

    return <div id="menu-wrapper">
        <button id="menu-toggle" className={show ? "open" : ""} onClick={() => setShow(!show)}/>
        <nav id="menu-items">
            <Link to="/my-reservations">My reservations</Link>
            <Link to="/">All reservations</Link>
        </nav>
    </div>
}