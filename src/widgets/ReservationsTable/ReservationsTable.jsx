import {isBefore, parseISO} from "date-fns";
import Modal from "@mui/material/Modal";
import UpdateReservationForm from "../UpdateReservationForm";
import {useState} from "react";

export const ReservationsTable = ({reservations, deleteCallback}) => {

    const [open, setOpen] = useState(false)
    const [filtered, setFiltered] = useState(reservations)
    const [itemToUpdate, setItemToUpdate] = useState({})

    const toggleModal = () => setOpen(!open)

    const enabled = date => isBefore(new Date(), parseISO(date))

    const filter = value => {
        if (value > 0) {
            setFiltered(reservations.filter(item => enabled(item.reservationFrom)))
        } else if (value < 0) {
            setFiltered(reservations.filter(item => !enabled(item.reservationFrom)))
        } else {
            setFiltered(reservations)
        }
    }

    const modifyButtons = item => <span>
        <i className="fa-solid fa-pen update-icon" title="Update reservation" onClick={() => {
            setItemToUpdate(item)
            toggleModal()
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
        <Modal open={open} onClose={() => toggleModal()}>
            <div className="modal-content">
            <span className="close-btn" onClick={toggleModal}>Close&#160;<i
                className="fa-regular fa-circle-xmark"/></span>
                <UpdateReservationForm reservation={itemToUpdate} enabled={enabled(itemToUpdate.reservationFrom)}
                                       updateCallback={toggleModal}/>
            </div>
        </Modal>
        <div className="reservations-table-filters-wrapper">
            <div>
                <input type="radio" id="all" name="filter" value={0} onClick={() => filter(0)}/>
                <label htmlFor="all">All reservations</label>
            </div>
            <div>
                <input type="radio" id="future" name="filter" value={1} onClick={() => filter(1)}/>
                <label htmlFor="future">Future reservations</label>
            </div>
            <div>
                <input type="radio" id="past" name="filter" value={-1} onClick={() => filter(-1)}/>
                <label htmlFor="past">Past reservations</label>
            </div>
        </div>
        <table className="reservations-table">
            <tbody>
            <tr className="reservations-table-head-row">
                <td className="reservations-table-cell">Patient name</td>
                <td className="reservations-table-cell">From</td>
                <td className="reservations-table-cell">To</td>
                <td className="reservations-table-cell"/>
            </tr>
            {rows}
            </tbody>
        </table>
    </div>
}