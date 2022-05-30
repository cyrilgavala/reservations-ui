import {useState} from "react";
import UpdateReservationForm from "../UpdateReservationForm";

export const ReservationDetail = ({reservation, deleteCallback, enabled}) => {

    const [data, setData] = useState(reservation)

    const updateCallback = response => {
        setData(response)
    }

    const handleDelete = event => {
        event.preventDefault()
        deleteCallback(data.uuid)
    }

    return <div className={"reservation-detail-wrapper"}>
        <p>Patient name: {data.reservationFor}</p>
        <p>Reservation from: {data.reservationFrom}</p>
        <p>Reservation to: {data.reservationTo}</p>
        {enabled && <span className="delete-btn" onClick={handleDelete}>Delete reservation&#160;<i className="fa-regular fa-circle-xmark"/></span>}
        <UpdateReservationForm reservation={data} updateCallback={updateCallback} enabled={enabled}/>
    </div>
}