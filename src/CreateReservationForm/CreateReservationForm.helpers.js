import * as Yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import axios from "axios";
import {properties} from "../properties";
import {format} from "date-fns";

const validationSchema = Yup.object().shape({
    username: Yup.string()
        .required('Username is required'),
    startDate: Yup.string()
        .required('Start date is required'),
    endDate: Yup.string()
        .required('End date is required')
});

const formOptions = {resolver: yupResolver(validationSchema)};

const createReservation = (date, data) => {
    return axios.post(properties.apiUrl, {
        reservationFor: data.username,
        reservationFrom: date + " " + data.startDate + ":00",
        reservationTo: date + " " + data.endDate + ":00",
        createdAt: format(new Date(), properties.dateTimeFormat)
    })
}

export {formOptions, createReservation}