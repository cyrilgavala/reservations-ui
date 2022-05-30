import {useEffect, useState} from "react";
import axios from "axios";
import {properties} from "../properties";
import {deleteReservation} from "../widgets/CalendarWrapper/CalendarWrapper.helpers";
import MenuWrapper from "../widgets/MenuWrapper";
import ReservationDetail from "../widgets/ReservationDetail";
import Spinner from "../widgets/Spinner";
import Header from "../widgets/Header";
import Footer from "../widgets/Footer";

const MyReservations = () => {

    const loggedInUser = "cecilek"

    const [data, setData] = useState([])

    useEffect(() => {
        axios.get(properties.apiUrl + "/" + loggedInUser)
            .then(res => setData(res.data))
            .catch(err => console.error(err.response.data))
    }, [loggedInUser])

    const deleteCallback = uuid => {
        deleteReservation(uuid)
            .then(() => {
                const filterReservations = data.filter(item => item.uuid !== uuid)
                setData(filterReservations)
            })
            .catch(err => console.error(err.response.data))
    }

    const details = data.map(item => <ReservationDetail key={item.uuid} reservation={item} enabled={true}
                                                        deleteCallback={deleteCallback}/>)

    return <>
        <MenuWrapper />
        <Header />
        {data.length === 0 && <Spinner />}
        {data.length > 0 && <div className="my-reservations-wrapper">{details}</div>}
        <Footer />
    </>
}

export default MyReservations;