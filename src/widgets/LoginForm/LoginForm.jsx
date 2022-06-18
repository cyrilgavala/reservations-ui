import {useContext, useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {formOptions} from "./LoginForm.helpers";
import {Link, useNavigate} from "react-router-dom";
import {UserContext} from "../../UserDetails";
import {loginUser} from "../../services/userService";
import jwt_decode from "jwt-decode";
import Spinner from "../Spinner";

const LoginForm = () => {

    const navigate = useNavigate()
    const {setUser} = useContext(UserContext)
    const {register, handleSubmit, reset, formState: {errors}} = useForm(formOptions)

    const [apiError, setApiError] = useState("")
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setUser({sub: "", rol: "", accessToken: ""})
    }, [setUser])

    const onSubmit = data => {
        setApiError("")
        setLoading(true)
        loginUser(data)
            .then(res => {
                const decoded = jwt_decode(res.data.accessToken)
                setUser({sub: decoded.sub, rol: decoded.rol, accessToken: res.data.accessToken})
                reset()
                navigate("/reservations")
            })
            .catch(err => {
                console.error(err)
                setApiError(err)
            })
            .finally(() => setLoading(false))
    }

    return <form id="login-form" className="form-wrapper" noValidate onSubmit={handleSubmit(onSubmit)}>
        <div className="input-wrapper">
            <label className="input-label" htmlFor="login-username">Username: </label>
            <input id="login-username" className="form-input" type="text" required autoFocus
                   disabled={loading} {...register("username")}/>
            <div className={"validation"}>{errors.username?.message}</div>
        </div>
        <div className={"input-wrapper"}>
            <label className="input-label" htmlFor="login-password">Password: </label>
            <input id="login-password" className="form-input" type="password" required
                   disabled={loading} {...register("password")}/>
            <div className={"validation"}>{errors.password?.message}</div>
        </div>
        <button className="submit-btn" disabled={loading} type="submit">
            {loading ? <Spinner/> : <span><i className="fa-solid fa-right-to-bracket"/> Log in</span>}
        </button>
        {apiError && <p className="error-message">{apiError}</p>}
        <p>Not a user? Register <Link to="/register">here</Link></p>
    </form>
}

export {LoginForm}