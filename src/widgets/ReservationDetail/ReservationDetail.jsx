import {useState} from "react";
import UpdateReservationForm from "../UpdateReservationForm";

export const ReservationDetail = ({reservation, deleteCallback, enabled}) => {

    const [data, setData] = useState(reservation)

    const updateCallback = response => setData(response)

    const handleDelete = event => {
        event.preventDefault()
        deleteCallback(data.uuid)
    }

    return <div className={"reservation-detail-wrapper"}>
        <UpdateReservationForm reservation={data} updateCallback={updateCallback} enabled={enabled}/>
        {enabled && <span className="delete-btn" onClick={handleDelete}><i className="fa-regular fa-circle-xmark"/> Delete reservation
        </span>}
    </div>
}