import Header from "../widgets/Header";
import CalendarWrapper from "../widgets/CalendarWrapper";
import MenuWrapper from "../widgets/MenuWrapper";
import {useContext} from "react";
import {UserContext} from "../UserDetails";
import ContentWrapper from "../widgets/ContentWrapper";
import Footer from "../widgets/Footer";

const Calendar = () => {

    const {user} = useContext(UserContext)

    return <div className="App">
        <MenuWrapper/>
        <Header/>
        <ContentWrapper content={<CalendarWrapper user={user}/>}/>
        <Footer/>
    </div>
}

export default Calendar;