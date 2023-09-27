import {BrowserRouter, Route, Routes} from "react-router-dom";
import Layout from "./template/Layout";
import TimeTrack from "./pages/TimeTrack";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import Logout from "./auth/Logout";
import Error404 from "./Error404";

function App() {
  return (
      <div id="app">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<TimeTrack/>}/>
              <Route path="/register" element={<RegisterPage />}/>
              <Route path="/login" element={<LoginPage/>}/>
              <Route path="/logout" element={<Logout/>}/>
              <Route path="*" element={<Error404/>}/>
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
  );
}

export default App;