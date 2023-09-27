import TrackedTimeList from "./timetracker/TrackedTimeList";
import CheckAuth from "../auth/CheckAuth";

function TimeTrack() {
    return (
        <>
            <CheckAuth/>
            <div className="mb-5">
                <TrackedTimeList/>
                <div className="mt-5">
                    <form>
                        <div className="d-flex flex-wrap flex-column gap-2">
                            <textarea id="description">
                            </textarea>
                            <button className="btn btn-lg btn-primary">Track time</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default TimeTrack;