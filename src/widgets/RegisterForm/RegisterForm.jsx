import {Link, useNavigate} from "react-router-dom";
import {useContext, useState} from "react";
import {useForm} from "react-hook-form";
import {formOptions} from "./RegisterForm.helpers";
import {registerUser} from "../../services/userService";
import jwt_decode from "jwt-decode";
import {UserContext} from "../../UserDetails";
import Spinner from "../Spinner";

export const RegisterForm = () => {

    const navigate = useNavigate()
    const {setUser} = useContext(UserContext)
    const {register, handleSubmit, reset, formState: {errors}} = useForm(formOptions)

    const [apiError, setApiError] = useState("")
    const [loading, setLoading] = useState(false)

    const onSubmit = data => {
        setApiError("")
        setLoading(true)
        registerUser(data)
            .then(res => {
                const decoded = jwt_decode(res.data.accessToken)
                setUser({sub: decoded.sub, rol: decoded.rol, accessToken: res.data.accessToken})
                reset()
                if ("ADMIN" === decoded.rol) {
                    navigate("/calendar")
                } else if ("USER" === decoded.rol) {
                    navigate("/my-reservations")
                }
            })
            .catch(err => {
                console.error(err)
                setApiError(err.response.data)
            })
            .finally(() => setLoading(false))
    }

    return <form className="form-wrapper" noValidate onSubmit={handleSubmit(onSubmit)}>
        <div className="input-wrapper">
            <label className="input-label" htmlFor="register-username">Username: </label>
            <input id="register-username" className="form-input" type="text" required autoFocus
                   disabled={loading} {...register("username")}/>
            <div className={"validation"}>{errors.username?.message}</div>
        </div>
        <div className={"input-wrapper"}>
            <label className="input-label" htmlFor="register-email">E-mail: </label>
            <input id="register-email" className="form-input" type="email" required
                   disabled={loading} {...register("email")}/>
            <div className={"validation"}>{errors.email?.message}</div>
        </div>
        <div className={"input-wrapper"}>
            <label className="input-label" htmlFor="register-password">Password: </label>
            <input id="register-password" className="form-input" type="password" required
                   disabled={loading} {...register("password")}/>
            <div className={"validation"}>{errors.password?.message}</div>
        </div>
        <div className={"input-wrapper"}>
            <label className="input-label" htmlFor="register-password2">Confirm password: </label>
            <input id="register-password2" className="form-input" type="password" required
                   disabled={loading} {...register("password2")}/>
            <div className={"validation"}>{errors.password2?.message}</div>
        </div>
        <button className="submit-btn" disabled={loading} type="submit">
            {loading ? <Spinner/> : <span><i className="fa-solid fa-right-to-bracket"/> Register</span>}
        </button>
        {apiError && <p className="error-message">{apiError}</p>}
        <p>Already a user? Log in <Link to="/">here</Link></p>
    </form>
}