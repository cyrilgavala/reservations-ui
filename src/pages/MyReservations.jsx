import {useContext, useEffect, useState} from "react";
import MenuWrapper from "../widgets/MenuWrapper";
import Spinner from "../widgets/Spinner";
import {UserContext} from "../UserDetails";
import {deleteReservation, loadReservationForUser} from "../services/reservationService";
import ContentWrapper from "../widgets/ContentWrapper";
import ReservationsTable from "../widgets/ReservationsTable";

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

    return <div className="App">
        <MenuWrapper/>
        {loading && <ContentWrapper content={<Spinner/>}/>}
        {user.sub.length === 0 && <ContentWrapper content={<p>User is not logged in</p>}/>}
        {user.sub.length > 0 && data.length > 0 &&
            <ContentWrapper content={<ReservationsTable reservations={data} deleteCallback={deleteCallback}
                                                        isAdmin={"ADMIN" === user.rol}/>}/>}
    </div>
}

export default MyReservations;