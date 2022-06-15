import CalendarWrapper from "../widgets/CalendarWrapper";
import MenuWrapper from "../widgets/MenuWrapper";
import {useContext} from "react";
import {UserContext} from "../UserDetails";
import ContentWrapper from "../widgets/ContentWrapper";

const Calendar = () => {

    const {user} = useContext(UserContext)

    return <div className="App">
        <MenuWrapper/>
        <ContentWrapper content={<CalendarWrapper user={user}/>}/>
    </div>
}

export default Calendar;