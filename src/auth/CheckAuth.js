import {useNavigate} from "react-router-dom";
import axios from "axios";
import {useEffect} from "react";

function CheckAuth() {
    const navigate = useNavigate();
    const apiAuthPath = process.env.REACT_APP_API_URL + "/users/user";

    const checkToken = async (authToken) => {
        try {
            const response = await axios.get(apiAuthPath, {
                headers: {
                    Authorization: authToken
                }
            });
            if (response.status !== 200) {
                throw new Error();
            }
            localStorage.setItem("userId", response.data.id);
        } catch (error) {
            let message = "Session time out! Log in to the system again!";
            alert(message);
            localStorage.removeItem("authToken");
            localStorage.removeItem("userId")
            navigate("/login");
        }
    };

    useEffect(() => {
        const authToken = localStorage.getItem("authToken");
        if (authToken !== null && authToken !== undefined && authToken !== "") {
            checkToken(authToken).then(r => {});
        } else {
            navigate("/login");
        }
    }, []);
}

export default CheckAuth;