import {useContext, useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {formOptions} from "./LoginForm.helpers";
import {useNavigate} from "react-router-dom";
import {UserContext} from "../../UserDetails";
import {logIn} from "../../service/userService";

const LoginForm = () => {

    const navigate = useNavigate()
    const {setUser} = useContext(UserContext)
    const {register, handleSubmit, reset, formState: {errors, isSubmitting}} = useForm(formOptions)
    const [apiError, setApiError] = useState("")

    useEffect(() => {
        setUser({name: "", roles: []})
    }, [setUser])

    const onSubmit = data => {
        setApiError("")
        const loggedInUser = logIn(data)
        setUser(loggedInUser)
        reset()
        navigate("/my-reservations")
    }

    return <form className="form-wrapper" noValidate onSubmit={handleSubmit(onSubmit)}>
        <div className="input-wrapper">
            <label className="input-label" htmlFor="login-username">Username: </label>
            <input id="login-username" className="form-input" type="text" required autoFocus
                   disabled={isSubmitting} {...register("username")}/>
            <div className={"validation"}>{errors.username?.message}</div>
        </div>
        <div className={"input-wrapper"}>
            <label className="input-label" htmlFor="login-password">Password: </label>
            <input id="login-password" className="form-input" type="password" required
                   disabled={isSubmitting} {...register("password")}/>
        </div>
        <button className="submit-btn" disabled={isSubmitting} type="submit">
            <span>{isSubmitting ? "Loading..." : "Log in"}</span>
        </button>
        {apiError && <p className="error-message">{apiError}</p>}
    </form>
}

export {LoginForm}