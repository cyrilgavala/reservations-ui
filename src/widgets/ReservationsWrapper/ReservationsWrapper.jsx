import {useState} from "react";
import ReservationDetail from "../ReservationDetail";
import Modal from '@mui/material/Modal';

export const ReservationsWrapper = ({reservations, deleteCallback, enabled}) => {

    const [open, setOpen] = useState(false);
    const details = reservations.map(item => <ReservationDetail key={item.uuid} reservation={item} enabled={enabled}
                                                                deleteCallback={deleteCallback}/>)

    const toggleModal = () => setOpen(!open)

    return <div className="reservations-wrapper">
        <label
            onClick={toggleModal}>{reservations.length} {reservations.length === 1 ? "reservation" : "reservations"}
        </label>
        <Modal open={open} onClose={toggleModal}>
            <div className="modal-content">
                <span className="close-btn" onClick={toggleModal}>Close&#160;<i className="fa-regular fa-circle-xmark"/></span>
                {details}
            </div>
        </Modal>
    </div>
}