import {useContext, useEffect, useState} from "react";
import MenuWrapper from "../widgets/MenuWrapper";
import ReservationDetail from "../widgets/ReservationDetail";
import Spinner from "../widgets/Spinner";
import {isBefore, parseISO} from "date-fns";
import {UserContext} from "../UserDetails";
import {deleteReservation, loadReservationForUser} from "../services/reservationService";
import ContentWrapper from "../widgets/ContentWrapper";

const MyReservations = () => {

    const {user} = useContext(UserContext)
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (user.sub.length > 0) {
            setLoading(true)
            loadReservationForUser(user)
                .then(res => setData(res.data))
                .catch(err => console.error(err.response.data))
                .finally(() => setLoading(false))
        }
    }, [user])

    const deleteCallback = uuid => {
        deleteReservation(uuid, user.accessToken)
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
        {loading && <ContentWrapper content={<Spinner/>}/>}
        {user.sub.length === 0 && <ContentWrapper content={<p>User is not logged in</p>}/>}
        {user.sub.length > 0 && data.length === 0 && !loading && <ContentWrapper content={<p>No reservations. Go to calendar to create one.</p>}/>}
        {user.sub.length > 0 && data.length > 0 && <ContentWrapper content={details}/>}
    </div>
}

export default MyReservations;