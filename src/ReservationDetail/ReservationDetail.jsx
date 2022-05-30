import {useState} from "react";
import UpdateReservationForm from "../UpdateReservationForm";

export const ReservationDetail = ({reservation, deleteCallback}) => {

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
        <i className="close-btn fa-regular fa-circle-xmark" title="Delete reservation" onClick={handleDelete}/>
        <UpdateReservationForm reservation={data} updateCallback={updateCallback} />
    </div>
}