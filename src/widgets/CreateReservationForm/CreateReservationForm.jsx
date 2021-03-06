import {useForm} from "react-hook-form";
import {formOptions} from "./CreateReservationForm.helpers";
import {useContext, useState} from "react";
import {createReservation} from "../../services/reservationService"
import {UserContext} from "../../UserDetails";
import Spinner from "../Spinner";

export const CreateReservationForm = ({callback, date}) => {

    const {user} = useContext(UserContext)
    const {register, handleSubmit, reset, formState: {errors}} = useForm(formOptions(user))

    const [apiError, setApiError] = useState("")
    const [loading, setLoading] = useState(false)

    const onSubmit = data => {
        setApiError("")
        setLoading(true)
        createReservation(date, data, user.accessToken)
            .then(res => callback(res.data))
            .catch(err => setApiError(err.response.data))
            .finally(() => {
                reset()
                setLoading(false)
            })
    }

    return (
        <form id="create-form" className="form-wrapper" noValidate onSubmit={handleSubmit(onSubmit)}>
            <div className="input-wrapper">
                <label className="input-label" htmlFor="create-username">Patient name: </label>
                <input id="create-username" className="form-input" type="text" required
                       disabled={loading || "USER" === user.rol} {...register("username")}/>
                <div className={"validation"}>{errors.username?.message}</div>
            </div>
            <div className={"input-wrapper"}>
                <label className="input-label" htmlFor="create-date">Selected date: </label>
                <input id="create-date" className="form-input" type="date" required value={date}
                       disabled {...register("startDate")}/>
            </div>
            <div className={"input-wrapper"}>
                <label className="input-label" htmlFor="create-start-date">Start time: </label>
                <input id="create-start-date" className="form-input" type="time" required step="60" autoFocus
                       disabled={loading} {...register("startDate")}/>
                <div className="validation">{errors.startDate?.message}</div>
            </div>
            <div className={"input-wrapper"}>
                <label className="input-label" htmlFor="create-end-date">End time: </label>
                <input id="create-end-date" className="form-input" type="time" step="60" required
                       disabled={loading} {...register("endDate")}/>
                <div className="validation">{errors.endDate?.message}</div>
            </div>
            <button className="submit-btn" disabled={loading} type="submit">
                {loading ? <Spinner/> : <span><i className="fa-solid fa-circle-plus"/> Create reservation</span>}
            </button>
            {apiError && <p className="error-message">{apiError}</p>}
        </form>
    )
}