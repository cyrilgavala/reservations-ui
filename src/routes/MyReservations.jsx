import {useContext, useEffect, useState} from "react";
import MenuWrapper from "../widgets/MenuWrapper";
import ReservationDetail from "../widgets/ReservationDetail";
import Spinner from "../widgets/Spinner";
import Header from "../widgets/Header";
import {isBefore, parseISO} from "date-fns";
import {UserContext} from "../UserDetails";
import {deleteReservation, loadReservationForUser} from "../service/reservationService";
import ContentWrapper from "../widgets/ContentWrapper";
import Footer from "../widgets/Footer";

const MyReservations = () => {

    const {user} = useContext(UserContext)
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (user.name.length > 0) {
            setLoading(true)
            loadReservationForUser(user)
                .then(res => setData(res.data))
                .catch(err => console.error(err.response.data))
                .finally(() => setLoading(false))
        }
    }, [user])

    const deleteCallback = uuid => {
        deleteReservation(uuid)
            .then(() => setData(data.filter(item => item.uuid !== uuid)))
            .catch(err => console.error(err.response.data))
    }

    const enable = date => isBefore(new Date(), parseISO(date))
    const details = data.map(item => <ReservationDetail key={item.uuid}
                                                        reservation={item}
                                                        enabled={enable(item.reservationFrom)}
                                                        deleteCallback={deleteCallback}/>)

    return <div className="App">
        <MenuWrapper/>
        <Header/>
        {loading && <Spinner/>}
        {user.name.length === 0 && <ContentWrapper content={<p>User is not logged in</p>}/>}
        {user.name.length > 0 && data.length === 0 && !loading && <ContentWrapper content={<p>No reservations. Go to calendar to create one.</p>}/>}
        {user.name.length > 0 && data.length > 0 && <ContentWrapper content={details}/>}
        <Footer/>
    </div>
}

export default MyReservations;