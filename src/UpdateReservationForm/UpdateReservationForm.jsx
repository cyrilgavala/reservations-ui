import {useForm} from "react-hook-form";
import {updateReservation, formOptions} from "./UpdateReservationForm.helpers";
import {useState} from "react";
import {format, parseISO} from "date-fns";
import {properties} from "../properties";

export const UpdateReservationForm = ({reservation, updateCallback}) => {

    const {register, handleSubmit, formState: {errors, isSubmitting}} = useForm(formOptions(reservation))
    const [apiError, setApiError] = useState("")

    const onSubmit = data => {
        setApiError("")
        reservation.reservationFrom = format(parseISO(data.startDate), properties.dateTimeFormat)
        reservation.reservationTo = format(parseISO(data.endDate), properties.dateTimeFormat)
        updateReservation(reservation)
            .then(res => updateCallback(res.data))
            .catch(err => setApiError(err.response.data))
    }

    return (
        <form className="form-wrapper" noValidate onSubmit={handleSubmit(onSubmit)}>
            <div className="input-wrapper">
                <label className="input-label" htmlFor="update-username">Patient name: </label>
                <input id="update-username" className="form-input" type="text" disabled {...register("username")}/>
                <div className={"validation"}>{errors.username?.message}</div>
            </div>
            <div className={"input-wrapper"}>
                <label className="input-label" htmlFor="update-start-date">Start time: </label>
                <input id="update-start-date" className="form-input" type="datetime-local" required step="60"
                       disabled={isSubmitting} {...register("startDate")}/>
                <div className="validation">{errors.startDate?.message}</div>
            </div>
            <div className={"input-wrapper"}>
                <label className="input-label" htmlFor="update-end-date">End time: </label>
                <input id="update-end-date" className="form-input" type="datetime-local" step="60" required
                       disabled={isSubmitting} {...register("endDate")}/>
                <div className="validation">{errors.endDate?.message}</div>
            </div>
            <button className="submit-btn" disabled={isSubmitting} type="submit">
                <span>{isSubmitting ? "Loading..." : "Update reservation"}</span>
            </button>
            {apiError && <p className="error-message">{apiError}</p>}
        </form>
    )
}