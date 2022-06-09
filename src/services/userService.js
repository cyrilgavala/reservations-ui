import axios from "axios";
import {properties} from "../properties";

const apiUrl = properties.apiUrl + "/user/"

const encryptPassword = password => {
    return btoa(password)
}

const loginUser = data => {
    return axios.post(apiUrl + "login", {
        username: data.username,
        password: encryptPassword(data.password),
    })
}

const registerUser = data => {
    return axios.post(apiUrl + "register", {
        username: data.username,
        email: data.email,
        password: encryptPassword(data.password),
    })
}

export {loginUser, registerUser}