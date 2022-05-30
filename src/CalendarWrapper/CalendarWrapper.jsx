import {useEffect, useState} from "react";
import {deleteReservation, getAllReservations} from "./CalendarWrapper.helpers";
import {format, parseISO} from "date-fns";
import {ReservationsWrapper} from "../ReservationsWrapper/ReservationsWrapper";
import Modal from "@mui/material/Modal";
import CreateReservationForm from "../CreateReservationForm";
import Calendar from "react-calendar";

export const CalendarWrapper = () => {
    const [reservations, setReservations] = useState([])
    const [open, setOpen] = useState(false)
    const [pressedDate, setPressedDate] = useState("")

    useEffect(() => {
        getAllReservations()
            .then(res => setReservations(res.data))
            .catch(err => console.error(err.response.data))
    }, [])

    const deleteCallback = uuid => {
        deleteReservation(uuid)
            .then(() => {
                const filterReservations = reservations.filter(item => item.uuid !== uuid)
                setReservations(filterReservations)
            })
            .catch(err => console.error(err.response.data))
    }

    const createCallback = reservation => {
        reservations.push(reservation)
        setReservations(reservations)
        toggleModal()
    }

    const createReservation = date => {
        setPressedDate(format(date, "yyyy-MM-dd"))
        toggleModal()
    }

    const renderTile = ({date}) => {
        const reservationsForDay = reservations.filter(item => {
            return format(parseISO(item.reservationFrom), "yyyy-MM-dd") === format(date, "yyyy-MM-dd")
        })
        return <>
        <span className="add-reservation-btn" onClick={() => createReservation(date)}>
                <i className="create-reservation fa-regular fa-circle-plus"></i><span> Create reservation</span>
            </span>
            {reservationsForDay.length > 0 && <ReservationsWrapper reservations={reservationsForDay} deleteCallback={deleteCallback}/>}
        </>

    }

    const toggleModal = () => setOpen(!open)

    return (<>
        {reservations.length === 0 && <p>Loading data</p>}
        {reservations.length > 0 && <div id="calendar-wrapper">
            <Modal open={open} onClose={() => toggleModal()}>
                <div className="modal-content">
                    <i className="close-btn fa-regular fa-circle-xmark" onClick={toggleModal}/>
                    <CreateReservationForm date={pressedDate} callback={createCallback}/>
                </div>
            </Modal>
            <Calendar view="month" tileContent={renderTile}/>
        </div>}
    </>);
}