import {Outlet} from "react-router-dom";

function Layout() {
    return (
        <div id="layout">
            <div id="content" className="container">
                <div className="row justify-content-center align-items-center mt-5 mb-5">
                    <div className="col-md-8 text-center">
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Layout;