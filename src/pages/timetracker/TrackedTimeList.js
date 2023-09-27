function TrackedTimeList() {
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
                    <tr>
                        <th scope="row">1</th>
                        <td>Some</td>
                        <td>03.04.2004</td>
                        <td>03.05.2004</td>
                        <td>
                            <button className="btn btn-sm btn-outline-danger">Delete</button>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">1</th>
                        <td>Some</td>
                        <td>03.04.2004</td>
                        <td>03.05.2004</td>
                        <td>
                            <button className="btn btn-sm btn-outline-danger">Delete</button>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">1</th>
                        <td>Some</td>
                        <td>03.04.2004</td>
                        <td>03.05.2004</td>
                        <td>
                            <button className="btn btn-sm btn-outline-danger">Delete</button>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </>);
}

export default TrackedTimeList;