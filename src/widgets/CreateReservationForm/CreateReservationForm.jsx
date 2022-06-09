import {useForm} from "react-hook-form";
import {formOptions} from "./CreateReservationForm.helpers";
import {useContext, useState} from "react";
import {createReservation} from "../../services/reservationService"
import {UserContext} from "../../UserDetails";

export const CreateReservationForm = ({callback, date}) => {

    const {user} = useContext(UserContext)
    const {register, handleSubmit, reset, formState: {errors, isSubmitting}} = useForm(formOptions(user))
    const [apiError, setApiError] = useState("")

    const onSubmit = data => {
        setApiError("")
        createReservation(date, data, user.accessToken)
            .then(res => callback(res.data))
            .catch(err => setApiError(err.response.data))
            .catch(err => console.error(err))
            .finally(() => reset())
    }

    return (
        <form className="form-wrapper" noValidate onSubmit={handleSubmit(onSubmit)}>
            <div className="input-wrapper">
                <label className="input-label" htmlFor="create-username">Patient name: </label>
                <input id="create-username" className="form-input" type="text" required
                       disabled={isSubmitting || "USER" === user.rol} {...register("username")}/>
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
                       disabled={isSubmitting} {...register("startDate")}/>
                <div className="validation">{errors.startDate?.message}</div>
            </div>
            <div className={"input-wrapper"}>
                <label className="input-label" htmlFor="create-end-date">End time: </label>
                <input id="create-end-date" className="form-input" type="time" step="60" required
                       disabled={isSubmitting} {...register("endDate")}/>
                <div className="validation">{errors.endDate?.message}</div>
            </div>
            <button className="submit-btn" disabled={isSubmitting} type="submit">
                <span><i className="fa-solid fa-circle-plus"/>{isSubmitting ? " Loading..." : " Create reservation"}</span>
            </button>
            {apiError && <p className="error-message">{apiError}</p>}
        </form>
    )
}