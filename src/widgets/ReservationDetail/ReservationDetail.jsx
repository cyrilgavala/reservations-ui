import {useState} from "react";
import UpdateReservationForm from "../UpdateReservationForm";
import {format, parseISO} from "date-fns";

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
        <p>Reservation from: {format(parseISO(data.reservationFrom), "dd.MM.yyyy HH:mm")}</p>
        <p>Reservation to: {format(parseISO(data.reservationTo), "dd.MM.yyyy HH:mm")}</p>
        {enabled && <span className="delete-btn" onClick={handleDelete}>Delete reservation&#160;<i className="fa-regular fa-circle-xmark"/></span>}
        {enabled && <UpdateReservationForm reservation={data} updateCallback={updateCallback} />}
    </div>
}