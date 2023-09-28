import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";

function TrackedTimeListElement(props) {
    const navigate = useNavigate();
    const listUrl = process.env.REACT_APP_API_URL + "/tracked-times/tracked-time";
    const [token, setToken] = useState(null);

    const sendDeleteRequest = async (id) => {
        try {
            const response = await axios.delete(listUrl, {
                params: {
                    id: id
                },
                headers: {
                    Authorization: token
                }
            });
            if (response.status !== 200) {
                throw new Error();
            }
        } catch (error) {
            console.log(error);
            let message = "Session time out! Log in to the system again!";
            alert(message);
        }
    }

    function deleteElement() {
        sendDeleteRequest(props.id).then(() => {
                if (props.deleteAction === true) {
                    props.setDeleteAction(false)
                } else {
                    props.setDeleteAction(true)
                }
            }
        );
    }

    useEffect(() => {
        const authToken = localStorage.getItem("authToken");
        if (authToken !== null && authToken !== undefined && authToken !== "") {
            setToken(authToken);
        } else {
            navigate("/login");
        }
    }, []);

    return (
        <tr>
            <th scope="row">{props.id}</th>
            <td>{props.description}</td>
            <td>{props.startTime}</td>
            <td>{props.endTime}</td>
            <td>
                <button className="btn btn-sm btn-outline-danger" onClick={deleteElement}>Delete</button>
            </td>
        </tr>
    );
}

export default TrackedTimeListElement;