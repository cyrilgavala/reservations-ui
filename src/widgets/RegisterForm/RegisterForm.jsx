import {Link, useNavigate} from "react-router-dom";
import {useState} from "react";
import {useForm} from "react-hook-form";
import {formOptions} from "./RegisterForm.helpers";
import {registerUser} from "../../services/userService";

export const RegisterForm = () => {

    const navigate = useNavigate()
    const {register, handleSubmit, reset, formState: {errors, isSubmitting}} = useForm(formOptions)
    const [apiError, setApiError] = useState("")

    const onSubmit = data => {
        setApiError("")
        const registeredUser = registerUser(data)
        console.log(registeredUser)
        reset()
        navigate("/")
    }

    return <form className="form-wrapper" noValidate onSubmit={handleSubmit(onSubmit)}>
        <div className="input-wrapper">
            <label className="input-label" htmlFor="register-username">Username: </label>
            <input id="register-username" className="form-input" type="text" required autoFocus
                   disabled={isSubmitting} {...register("username")}/>
            <div className={"validation"}>{errors.username?.message}</div>
        </div>
        <div className={"input-wrapper"}>
            <label className="input-label" htmlFor="register-email">E-mail: </label>
            <input id="register-email" className="form-input" type="email" required
                   disabled={isSubmitting} {...register("email")}/>
            <div className={"validation"}>{errors.email?.message}</div>
        </div>
        <div className={"input-wrapper"}>
            <label className="input-label" htmlFor="register-password">Password: </label>
            <input id="register-password" className="form-input" type="password" required
                   disabled={isSubmitting} {...register("password")}/>
            <div className={"validation"}>{errors.password?.message}</div>
        </div>
        <div className={"input-wrapper"}>
            <label className="input-label" htmlFor="register-password2">Confirm password: </label>
            <input id="register-password2" className="form-input" type="password" required
                   disabled={isSubmitting} {...register("password2")}/>
            <div className={"validation"}>{errors.password2?.message}</div>
        </div>
        <button className="submit-btn" disabled={isSubmitting} type="submit">
            <span><i className="fa-solid fa-right-to-bracket"/>{isSubmitting ? " Loading..." : " Register"}</span>
        </button>
        {apiError && <p className="error-message">{apiError}</p>}
        <p>Already a user? Log in <Link to="/">here</Link></p>
    </form>
}