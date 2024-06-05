import { useFormik } from "formik";
import { useContext } from "react";
import * as yup from "yup";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";


function Login() {
    const { login } = useContext(UserContext)
    const navigate = useNavigate()

    const formSchema = yup.object().shape({
        username: yup.string().required("Must enter username").max(20),
        password: yup.string().required("Password required"),
    })

    const formik = useFormik({
        initialValues: {
            username: "",
            password: "",
        },
        validationSchema: formSchema,
        onSubmit: (values) => {
            fetch("/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values, null, 2),
            })
            .then((r) => {
                if (r.status === 200) {
                    r.json().then((data) => login(data), navigate('/'))
                } else {
                    alert('Incorrect username or password')
                }})
    }
})

    return (
        <div>
            <h1>Login Here</h1>
            <div className="login-form">
                <form onSubmit={formik.handleSubmit} style={{ margin: "30px" }}>
                    <label htmlFor='username'><b>Username</b></label>
                    <br />
                    <input
                        id='username'
                        name='username'
                        placeholder='Enter Username...'
                        onChange={formik.handleChange}
                        value={formik.values.username}
                    />
                    <p style={{ color: "red" }}>{formik.errors.username}</p>
                    <label htmlFor='password'><b>Password</b></label>
                    <br />
                    <input
                        id='password'
                        name='password'
                        placeholder='Enter Password...'
                        onChange={formik.handleChange}
                        value={formik.values.password}
                    />
                    <p style={{ color: "red" }}>{formik.errors.password}</p>
                    <button type="submit">Submit</button>
                </form>
            </div>
            
        </div>
    )
}


export default Login