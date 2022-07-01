import {isBefore, parseISO} from "date-fns";
import Modal from "@mui/material/Modal";
import UpdateReservationForm from "../UpdateReservationForm";
import {useEffect, useState} from "react";

export const ReservationsTable = ({reservations, deleteCallback, isAdmin}) => {

    const [open, setOpen] = useState(false)
    const [filterDate, setFilterDate] = useState(0)
    const [filterName, setFilterName] = useState("")
    const [filtered, setFiltered] = useState(reservations)
    const [itemToUpdate, setItemToUpdate] = useState({})

    const enabled = date => isBefore(new Date(), parseISO(date))

    useEffect(() => {
        const filteredByName = reservations.filter(item => item.reservationFor.toLowerCase().includes(filterName.toLowerCase()))
        if (filterDate > 0) {
            setFiltered(filteredByName.filter(item => enabled(item.reservationFrom)))
        } else if (filterDate < 0) {
            setFiltered(filteredByName.filter(item => !enabled(item.reservationFrom)))
        } else {
            setFiltered(filteredByName)
        }
    }, [reservations, filterDate, filterName])

    const modifyButtons = item => <span>
        <i className="fa-solid fa-pen update-icon" title="Update reservation" onClick={() => {
            setItemToUpdate(item)
            setOpen(!open)
        }}/>
            <i className="fa-regular fa-circle-xmark delete-icon" title="Delete reservation"
               onClick={() => deleteCallback(item.uuid)}/>
            </span>

    const rows = filtered.map(item => <tr className="reservations-table-row" key={item.uuid}>
        <td className="reservations-table-cell">{item.reservationFor}</td>
        <td className="reservations-table-cell">{item.reservationFrom}</td>
        <td className="reservations-table-cell">{item.reservationTo}</td>
        <td className="reservations-table-cell">{enabled(item.reservationFrom) ? modifyButtons(item) : ""}</td>
    </tr>)

    return <div className="reservations-table-wrapper">
        <Modal open={open} onClose={() => setOpen(!open)}>
            <div className="modal-content">
            <span className="close-btn" onClick={() => setOpen(!open)}>Close&#160;<i
                className="fa-regular fa-circle-xmark"/></span>
                <UpdateReservationForm reservation={itemToUpdate} enabled={enabled(itemToUpdate.reservationFrom)}
                                       updateCallback={() => setOpen(!open)}/>
            </div>
        </Modal>
        <div className="reservations-table-date-filters-wrapper">
            <div>
                <input type="radio" id="all" name="filter" value={0} checked={0 === filterDate}
                       onClick={() => setFilterDate(0)}/>
                <label htmlFor="all">All reservations</label>
            </div>
            <div>
                <input type="radio" id="future" name="filter" value={1} checked={1 === filterDate}
                       onClick={() => setFilterDate(1)}/>
                <label htmlFor="future">Future reservations</label>
            </div>
            <div>
                <input type="radio" id="past" name="filter" value={-1} checked={-1 === filterDate}
                       onClick={() => setFilterDate(-1)}/>
                <label htmlFor="past">Past reservations</label>
            </div>
        </div>
        {isAdmin && <div className="reservations-table-name-filter-wrapper">
            <label className="input-label" htmlFor="past">Name: </label>
            <input className="form-input" type="text" id="name" name="filter"
                   onChange={event => setFilterName(event.target.value)}/>
        </div>}
        {filtered.length === 0 && <p>No reservations to display.</p>}
        {filtered.length > 0 && <table className="reservations-table">
            <thead>
            <tr className="reservations-table-head-row">
                <th className="reservations-table-cell">Patient name</th>
                <th className="reservations-table-cell">From</th>
                <th className="reservations-table-cell">To</th>
                <th className="reservations-table-cell"/>
            </tr>
            </thead>
            <tbody>
                {rows}
            </tbody>
        </table>}
    </div>
}