import {useEffect, useState} from "react";
import {format, parseISO, isBefore, isEqual, startOfToday} from "date-fns";
import {ReservationsWrapper} from "../ReservationsWrapper/ReservationsWrapper";
import Modal from "@mui/material/Modal";
import CreateReservationForm from "../CreateReservationForm";
import Calendar from "react-calendar";
import Spinner from "../Spinner";
import {getAllReservations, getReservationForUser, deleteReservation} from "../../service/reservationService"

export const CalendarWrapper = ({user}) => {
    const [reservations, setReservations] = useState([])
    const [open, setOpen] = useState(false)
    const [pressedDate, setPressedDate] = useState("")

    useEffect(() => {
        if (user.roles !== undefined && user.roles.includes("ADMIN")) {
            getAllReservations()
                .then(res => setReservations(res.data))
                .catch(err => console.error(err.response.data))
        } else {
            getReservationForUser(user.name)
                .then(res => setReservations(res.data))
                .catch(err => console.error(err.response.data))
        }
    }, [user])

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
        const isBeforeOrEqual = isBefore(startOfToday(), date) || isEqual(startOfToday(), date)
        return <>
            {isBeforeOrEqual && <span className="add-reservation-btn" onClick={() => createReservation(date)}>
                <i className="create-reservation fa-regular fa-circle-plus"></i><span> Create reservation</span>
            </span>}
            {reservationsForDay.length > 0 &&
                <ReservationsWrapper reservations={reservationsForDay} deleteCallback={deleteCallback}/>}
        </>

    }

    const toggleModal = () => setOpen(!open)

    return <>
        {reservations.length === 0 && <Spinner/>}
        {user.name.length === 0 && <p>User is not logged in</p>}
        {user.name.length > 0 && reservations.length > 0 && <div id="calendar-wrapper">
            <Modal open={open} onClose={() => toggleModal()}>
                <div className="modal-content">
                    <span className="close-btn" onClick={toggleModal}>Close&#160;<i
                        className="fa-regular fa-circle-xmark"/></span>
                    <CreateReservationForm date={pressedDate} callback={createCallback}/>
                </div>
            </Modal>
            <Calendar view="month" tileContent={renderTile}/>
        </div>}
    </>
}