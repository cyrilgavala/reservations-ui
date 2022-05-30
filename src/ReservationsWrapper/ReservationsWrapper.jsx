import {useState} from "react";
import ReservationDetail from "../ReservationDetail";
import Modal from '@mui/material/Modal';

export const ReservationsWrapper = ({reservations, deleteCallback}) => {

    const [open, setOpen] = useState(false);
    const details = reservations.map(item => <ReservationDetail key={item.uuid} reservation={item} deleteCallback={deleteCallback}/>)

    const toggleModal = () => setOpen(!open)

    return <div className="reservations-wrapper" onClick={toggleModal}>
        <label>{reservations.length} {reservations.length === 1 ? "reservation" : "reservations"}</label>
        <Modal open={open} onClose={() => toggleModal()}>
            <div className="modal-content">
                {details}
            </div>
        </Modal>
    </div>
}