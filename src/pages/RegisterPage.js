import {Link, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";

function RegisterPage() {
    const navigate = useNavigate();
    const apiRegisterPath = process.env.REACT_APP_API_URL + "/users/user";
    const [formData, setFormData] = useState({
        username: "",
        password: ""
    });
    const [error, setError] = useState(null);
    const [successRegister, setSuccessReagister] = useState(false);

    function handleChange(event) {
        const {name, value} = event.target;
        setFormData(prevState => (
            {
                ...prevState,
                [name]: value
            }
        ));
    }

    const register = (event) => {
        event.preventDefault();
        let valid = validateForm();
        if (valid) {
            sendForm().then(() => {
            });
        }
    }

    const sendForm = async () => {
        try {
            const response = await axios.post(apiRegisterPath, formData);
            if (response.status === 200) {
                setSuccessReagister(true)
            } else {
                throw new Error();
            }
        } catch (error) {
            setError("User with this username already exists or something vent wrong!");
        }
    };

    useEffect(() => {
    }, [successRegister]);

    function validateForm() {
        let appendMessage = "";
        let result = true;

        if (formData.username.length > 50 || formData.username.length < 2) {
            appendMessage += "Username should range between 2 and 50 characters. ";
            result = false;
        }

        if (formData.password.length > 50 || formData.password.length < 8) {
            appendMessage += "Password should range between 8 and 50 characters.";
            result = false;
        }

        setError(appendMessage);
        return result;
    }

    return (
        <>
            {successRegister && (
                <div className="alert alert-success m-5" role="alert">
                    <p>
                        Your successfully registered new account.
                    </p>
                    <Link to="/login" className="btn btn-outline-success btn-sm">Log in</Link>
                </div>
            )}
            {error && (
                <div className="alert alert-danger d-flex align-items-center m-5" role="alert">
                    {error}
                </div>
            )}
            <div id="login" className="container py-5 my-5">
                <div className="row justify-content-center align-items-center">
                    <div className="col-md-5">
                        <div className="form-signin w-100 m-auto">
                            <form className="d-flex flex-column gap-2">
                                <h1 className="h3 mb-3 fw-normal">Please sign up or <Link to="/login">login</Link></h1>

                                <div className="form-floating">
                                    <input type="text" name="username" className="form-control" id="floatingInput"
                                           value={formData.username} onChange={handleChange}
                                           placeholder="name@example.com"/>
                                    <label htmlFor="floatingInput">Username</label>
                                </div>
                                <div className="form-floating">
                                    <input type="password" name="password" className="form-control"
                                           value={formData.password} onChange={handleChange}
                                           id="floatingPassword" placeholder="Password"/>
                                    <label htmlFor="floatingPassword">Password</label>
                                </div>
                                <button className="btn btn-primary w-100 py-2" type="submit" onClick={register}>Sign up
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default RegisterPage;