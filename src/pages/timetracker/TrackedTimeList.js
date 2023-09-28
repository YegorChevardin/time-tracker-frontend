import {useEffect, useState} from "react";
import axios from "axios";
import TrackedTimeListElement from "./TrackedTimeListElement";
import {useNavigate} from "react-router-dom";

function TrackedTimeList() {
    const navigate = useNavigate();
    const listUrl = process.env.REACT_APP_API_URL + "/tracked-times";
    const [trackedTimeList, setTrackedTimeList] = useState([]);
    const [deleteAction, setDeleteAction] = useState(false);

    const loadTrackedTimes = async (token, userId) => {
        try {
            const response = await axios.get(listUrl, {
                params: {
                    userId: userId
                },
                headers: {
                    Authorization: token
                }
            });
            if (response.status !== 200) {
                throw new Error();
            }
            setTrackedTimeList(response.data);
        } catch (error) {
            console.log(error);
            let message = "Session time out! Log in to the system again!";
            alert(message);
        }
    }

    useEffect(() => {
        getElements();
    }, [deleteAction]);

    useEffect(() => {}, [trackedTimeList])

    useEffect(() => {
        getElements();
    }, []);

    function getElements() {
        const authToken = localStorage.getItem("authToken");
        const userId = localStorage.getItem("userId");
        if (authToken !== null && authToken !== undefined && authToken !== "") {
            loadTrackedTimes(authToken, userId).then();
        } else {
            navigate("/login");
        }
    }

    return (
        <>
            <div className="table-responsive">
                <table className="table table-striped table-hover table-borderless ">
                    <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Description</th>
                        <th scope="col">Start date</th>
                        <th scope="col">End date</th>
                        <th scope="col">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {trackedTimeList.map(element => (<TrackedTimeListElement key={element.id} deleteAction={deleteAction} setDeleteAction={setDeleteAction} {...element}/>))}
                    </tbody>
                </table>
            </div>
        </>);
}

export default TrackedTimeList;