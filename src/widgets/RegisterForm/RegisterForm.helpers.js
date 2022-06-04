import * as Yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";

const validationSchema = Yup.object().shape({
    username: Yup.string()
        .required('Username is required'),
    email: Yup.string()
        .email()
        .required('Email is required'),
    password: Yup.string()
        .required('Password is required')
        .min(8, "Password must have at least 8 characters"),
    password2: Yup.string()
        .required('Confirm password is required')
        .oneOf([Yup.ref('password'), null], "Passwords don't match"),
});

const formOptions = {resolver: yupResolver(validationSchema)};

export {formOptions}