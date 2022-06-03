import * as Yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";

const validationSchema = Yup.object().shape({
    username: Yup.string()
        .required('Username is required'),
    startDate: Yup.string()
        .required('Start date is required'),
    endDate: Yup.string()
        .required('End date is required')
});

const formOptions = user => {
    return {
        resolver: yupResolver(validationSchema),
        defaultValues: {username: user.roles.filter(role => role === "ADMIN").length > 0 ? "" : user.name},
    }
};

export {formOptions}