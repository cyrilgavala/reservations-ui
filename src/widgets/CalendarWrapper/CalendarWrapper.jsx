import {useEffect, useState} from "react";
import {format, parseISO, isBefore, isEqual, startOfToday} from "date-fns";
import {ReservationsWrapper} from "../ReservationsWrapper/ReservationsWrapper";
import Modal from "@mui/material/Modal";
import CreateReservationForm from "../CreateReservationForm";
import Calendar from "react-calendar";
import Spinner from "../Spinner";
import {loadReservationForUser, deleteReservation} from "../../services/reservationService"

export const CalendarWrapper = ({user}) => {
    const [reservations, setReservations] = useState([])
    const [open, setOpen] = useState(false)
    const [pressedDate, setPressedDate] = useState("")
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        user.name?.length > 0 && loadReservationForUser(user)
            .then(res => setReservations(res.data))
            .catch(err => console.error(err.response.data))
            .finally(() => setLoading(false))
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
        {user.name.length === 0 && <p>User is not logged in</p>}
        {user.name.length > 0 && loading && <Spinner/>}
        {user.name.length > 0 && !loading && <div id="calendar-wrapper">
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