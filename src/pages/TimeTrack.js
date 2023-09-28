import TrackedTimeList from "./timetracker/TrackedTimeList";
import CheckAuth from "../auth/CheckAuth";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";

function TimeTrack() {
    const navigate = useNavigate();
    const listUrl = process.env.REACT_APP_API_URL + "/tracked-times/tracked-time";
    const [trackButtonStatus, setTrackButtonStatus] = useState(false);
    const [token, setToken] = useState(null);
    const [sendingObject, setSendingObject] = useState(initSendingObject());

    function initSendingObject() {
        const userId = localStorage.getItem("userId");
        return {
            description: "",
            user: {
                id: userId
            },
            startTime: "",
            endTime: ""
        };
    }

    function trackButtonClick() {
        if (trackButtonStatus) {
            setSendingObject({
                ...sendingObject,
                endTime: formatTimestamp(Date.now())
            });
            setTrackButtonStatus(false);
        } else {
            setSendingObject({
                ...sendingObject,
                startTime: formatTimestamp(Date.now())
            });
            setTrackButtonStatus(true);
        }
    }

    useEffect(() => {
        if (sendingObject.endTime !== "") {
            sendCreateRequest(sendingObject).then(
                () => {window.location.reload()}
            );
        }
    }, [sendingObject])

    useEffect(() => {
    }, [trackButtonStatus]);

    useEffect(() => {
        const authToken = localStorage.getItem("authToken");
        if (authToken !== null && authToken !== undefined && authToken !== "") {
            setToken(authToken);
        } else {
            navigate("/login");
        }
    }, []);

    const sendCreateRequest = async (obj) => {
        try {
            const response = await axios.post(listUrl, obj, {
                headers: {
                    Authorization: token
                }
            });
            if (response.status !== 200) {
                throw new Error();
            }
        } catch (error) {
            let message = "Session time out! Log in to the system again!";
            alert(message);
        }
    }

    function formatTimestamp(timestamp) {
        const date = new Date(timestamp);

        const months = [
            "Jan", "Feb", "Mar", "Apr", "May", "Jun",
            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
        ];

        const month = months[date.getMonth()];
        const day = date.getDate();
        const year = date.getFullYear();
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const seconds = date.getSeconds();
        const ampm = hours >= 12 ? "PM" : "AM";

        const formattedDate = `${month} ${day}, ${year}, ${hours}:${minutes}:${seconds} ${ampm}`;
        return formattedDate;
    }

    return (
        <>
            <CheckAuth/>
            <div className="mb-5">
                <TrackedTimeList/>
                <div className="mt-5">
                    <form>
                        <div className="d-flex flex-wrap flex-column gap-2">
                            <textarea id="description" value={sendingObject.description} onChange={(event) => {
                                setSendingObject({
                                    ...sendingObject,
                                    description: event.target.value
                                })
                            }}>
                            </textarea>
                            {!trackButtonStatus && (
                                <button className="btn btn-lg btn-primary" onClick={trackButtonClick}>Track time</button>
                            )}
                            {trackButtonStatus && (
                                <button className="btn btn-lg btn-success" onClick={trackButtonClick}>Stop tracking time</button>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default TimeTrack;