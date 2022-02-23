import { ErrorMessage, Field, Formik } from "formik"
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import { useState } from "react"
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { registerData } from "../Redux/Actions/action";

const Dashboard = () => {
    // for trigger any Action
    const [value, setValue] = useState()
    const dispatch = useDispatch()
    const initialValues = {
        name: "",
        phone: "",
        birthDate: "",
        password: "",
        conPassword: "",
        address: "",
    }

    // Form Validation Schema with YUP and Formik

    const validationSchema = yup.object({
        password: yup
            .string()
            .required()
            .min(8)
            .max(64)
            .label("Password"),
        conPassword: yup
            .string()
            .required()
            .min(8)
            .max(64)
            .oneOf([yup.ref("password"), null], "Password does not match")
            .label("Password Confirmation"),
        birthDate: yup.string().required("Required"),
        name: yup.string()
            .min(6, "Too Short")
            .max(50, "Too Long")
            .required("Required")
            .matches(/^[aA-zZ\s]+$/, 'Please enter valid name'),
        address: yup.string()
            .min(6, "Too Short")
            .max(250, "Too Long")
            .required("Required"),
        phone: yup
            .number()
            // regexr.com/6anqd
            // .matches(/(\+91\ )[6-9]{1}[0-9 ]{4}[0-9 ]{4}[0-9]{3}/, {
            //     message: "Invalid Indian number",
            //     excludeEmptyString: false,
            // })
            .required("Required"),
    });

    const handleFormSubmit = (values) => {
        dispatch(registerData(values))
    }
    return <div>
        <div className=" w-50">
            {/**Formik Form */}
            <Formik onSubmit={handleFormSubmit} initialValues={initialValues} validationSchema={validationSchema}>
                {({ handleSubmit, handleChange, values, errors, setFieldValue }) => (
                    <form onSubmit={(e) => {
                        e.preventDefault()
                        handleSubmit()
                    }}>
                        <div className="d-flex p-2">
                            <div className="w-25">
                                <label>First Name</label>
                            </div>
                            <div className="w-75">
                                <Field type="text" name="name" placeholder="First Name" className="form-control" onChange={handleChange} />
                                <ErrorMessage component="div" name="name" className="text-danger error" />
                            </div>
                        </div>

                        <div className="d-flex p-2">
                            <div className="w-25">
                                <label>Birth Date</label>
                            </div>
                            <div className="w-75">
                                <Field type="date" placeholder="Birth Date" name={"birthDate"} onChange={handleChange} className="form-control" />
                                <ErrorMessage component="div" name="birthDate" className="text-danger error " />
                            </div>
                        </div>

                        <div className="d-flex p-2">
                            <div className="w-25">
                                <label>Phone</label>
                            </div>
                            <div className="w-75">
                                <PhoneInput
                                    country="GB"
                                    defaultCountry="GB"
                                    placeholder="Enter phone number"
                                    value={values.phone}
                                    onChange={(e) => {
                                        setFieldValue('phone', e)
                                    }} />
                                <ErrorMessage component="div" name="phone" className="text-danger error" />
                            </div>
                        </div>

                        <div className="d-flex p-2">
                            <div className="w-25">
                                <label>Adress</label>
                            </div>
                            <div className="w-75">
                                <Field as="textarea" type="text" name="address" onChange={handleChange} placeholder="Address" className="form-control" />
                                <ErrorMessage component="div" name="address" className="text-danger error" />
                            </div>
                        </div>

                        <div className="d-flex p-2">
                            <div className="w-25">
                                <label>Password</label>
                            </div>
                            <div className="w-75">
                                <Field type="password" placeholder="Password" className="form-control" name="password" onChange={handleChange} />
                                <ErrorMessage component="div" name="password" className="text-danger error" />
                            </div>
                        </div>

                        <div className="d-flex p-2">
                            <div className="w-25">
                                <label>Confirm password</label>
                            </div>
                            <div className="w-75">
                                <Field type="password" placeholder="Confirm Password" className="form-control" name="conPassword" onChange={handleChange} />
                                <ErrorMessage component="div" name="conPassword" className="text-danger error" />
                            </div>
                        </div>

                        <input type="submit" className="btn btn-primary" value={"Submit"} />
                    </form>
                )}
            </Formik>
        </div>
    </div>
}

export default Dashboard