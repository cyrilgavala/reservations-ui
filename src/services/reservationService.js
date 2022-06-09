import axios from "axios";
import {properties} from "../properties";
import {format} from "date-fns";

const apiUrl = properties.apiUrl + "/reservation/"

const config = accessToken => {
    return {
        headers: {"Authorization": "Bearer " + accessToken},
    }
}

const getAllReservations = user => {
    return axios.get(apiUrl, config(user.accessToken))
}

const getReservationForUser = user => {
    return axios.get(apiUrl + user.sub, config(user.accessToken))
}

const loadReservationForUser = user => {
    if (user.rol !== undefined && "ADMIN" === user.rol) {
        return getAllReservations(user)
    } else {
        return getReservationForUser(user)
    }
}

const createReservation = (date, data, accessToken) => {
    return axios.post(apiUrl, {
        reservationFor: data.username,
        reservationFrom: date + " " + data.startDate + ":00",
        reservationTo: date + " " + data.endDate + ":00",
        createdAt: format(new Date(), properties.dateTimeFormat)
    }, config(accessToken))
}

const updateReservation = (data, accessToken) => {
    return axios.put(apiUrl, {
        uuid: data.uuid,
        reservationFor: data.reservationFor,
        reservationFrom: data.reservationFrom,
        reservationTo: data.reservationTo,
    }, config(accessToken))
}

const deleteReservation = (uuid, accessToken) => {
    return axios.delete(apiUrl + uuid, config(accessToken))
}

export {loadReservationForUser, createReservation, updateReservation, deleteReservation}