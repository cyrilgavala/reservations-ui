import * as Yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";

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
}

export {formOptions}