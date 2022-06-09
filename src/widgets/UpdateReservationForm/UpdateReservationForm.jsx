import {useForm} from "react-hook-form";
import {formOptions} from "./UpdateReservationForm.helpers";
import {useContext, useState} from "react";
import {format, parseISO} from "date-fns";
import {properties} from "../../properties";
import {updateReservation} from "../../services/reservationService";
import {UserContext} from "../../UserDetails";
import Spinner from "../Spinner";

export const UpdateReservationForm = ({reservation, updateCallback, enabled}) => {

    const {user} = useContext(UserContext)
    const {register, handleSubmit, formState: {errors}} = useForm(formOptions(reservation))

    const [apiError, setApiError] = useState("")
    const [loading, setLoading] = useState(false)

    const onSubmit = data => {
        setApiError("")
        setLoading(true)
        reservation.reservationFrom = format(parseISO(data.startDate), properties.dateTimeFormat)
        reservation.reservationTo = format(parseISO(data.endDate), properties.dateTimeFormat)
        updateReservation(reservation, user.accessToken)
            .then(res => updateCallback(res.data))
            .catch(err => setApiError(err.response.data))
            .finally(() => setLoading(false))
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
                       disabled={loading || !enabled} {...register("startDate")}/>
                <div className="validation">{errors.startDate?.message}</div>
            </div>
            <div className={"input-wrapper"}>
                <label className="input-label" htmlFor="update-end-date">End time: </label>
                <input id="update-end-date" className="form-input" type="datetime-local" step="60" required
                       disabled={loading || !enabled} {...register("endDate")}/>
                <div className="validation">{errors.endDate?.message}</div>
            </div>
            <button className="submit-btn" disabled={loading || !enabled} type="submit">
                {loading ? <Spinner/> : <span><i className="fa-solid fa-pen"/> Update reservation</span>}
            </button>
            {apiError && <p className="error-message">{apiError}</p>}
        </form>
    )
}