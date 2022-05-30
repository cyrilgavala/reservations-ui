import axios from "axios";
import {properties} from "../properties";

const getAllReservations = () => {
    return axios.get(properties.apiUrl)
}

const deleteReservation = uuid => {
    return axios.delete(properties.apiUrl + `/${uuid}`)
}

export {getAllReservations, deleteReservation}