import * as Yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import axios from "axios";
import {properties} from "../properties";

const validationSchema = Yup.object().shape({
    username: Yup.string().required('Username is required'),
    startDate: Yup.string().required('Start date is required'),
    endDate: Yup.string().required('End date is required')
});

const formOptions = data => {
    return {
        resolver: yupResolver(validationSchema),
        defaultValues: {
            username: data.reservationFor,
            startDate: data.reservationFrom,
            endDate: data.reservationTo,
        }
    }
};

const updateReservation = (data) => {
    return axios.put(properties.apiUrl, {
        uuid: data.uuid,
        reservationFor: data.reservationFor,
        reservationFrom: data.reservationFrom,
        reservationTo: data.reservationTo,
    })
}

export {formOptions, updateReservation}