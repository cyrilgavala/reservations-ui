import axios from "axios";
import {properties} from "../properties";
import {format} from "date-fns";


const getAllReservations = () => {
    return axios.get(properties.apiUrl)
}

const getReservationForUser = username => {
    return axios.get(properties.apiUrl + "/" + username)
}

const loadReservationForUser = user => {
    if (user.roles !== undefined && user.roles.includes("ADMIN")) {
        return getAllReservations()
    } else {
        return getReservationForUser(user.name)
    }
}

const createReservation = (date, data) => {
    return axios.post(properties.apiUrl, {
        reservationFor: data.username,
        reservationFrom: date + " " + data.startDate + ":00",
        reservationTo: date + " " + data.endDate + ":00",
        createdAt: format(new Date(), properties.dateTimeFormat)
    })
}

const updateReservation = (data) => {
    return axios.put(properties.apiUrl, {
        uuid: data.uuid,
        reservationFor: data.reservationFor,
        reservationFrom: data.reservationFrom,
        reservationTo: data.reservationTo,
    })
}

const deleteReservation = uuid => {
    return axios.delete(properties.apiUrl + `/${uuid}`)
}

export {loadReservationForUser, createReservation, updateReservation, deleteReservation}