import {useContext, useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {formOptions} from "./LoginForm.helpers";
import {Link, useNavigate} from "react-router-dom";
import {UserContext} from "../../UserDetails";
import {loginUser} from "../../services/userService";

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
        const loggedInUser = loginUser(data)
        setUser(loggedInUser)
        reset()
        if (loggedInUser.roles.includes("ADMIN")) {
            navigate("/calendar")
        } else if (loggedInUser.roles.includes("USER")) {
            navigate("/my-reservations")
        }
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
            <div className={"validation"}>{errors.password?.message}</div>
        </div>
        <button className="submit-btn" disabled={isSubmitting} type="submit">
            <span><i className="fa-solid fa-right-to-bracket"/>{isSubmitting ? " Loading..." : " Log in"}</span>
        </button>
        {apiError && <p className="error-message">{apiError}</p>}
        <p>Not a user? Register <Link to="/register">here</Link></p>
    </form>
}

export {LoginForm}