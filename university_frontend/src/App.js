import React, { useEffect } from "react";
import "./App.css";
import { Home } from "./pages/Home/Home";
import { Profile } from "./pages/Profile/Profile";
import { Routes, Route } from "react-router-dom";
//import PrivateRoute from "./pages/ProtectedRoute/PrivateRoute";
import LogIn from "./pages/Login/Login";
import { Moderator } from "./pages/Moderator/Moderator";

function App() {
  useEffect(() => {
    console.log("hello");
  }, []);
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/degrees" element={<PrivateRoute />}> */}
        <Route path="/degrees" element={<Profile />} />
        {/* </Route> */}
        {/* <Route path="/moderators" element={<PrivateRoute />}> */}
        <Route path="/moderators" element={<Moderator />} />
        {/* </Route> */}
        <Route path="/login" element={<LogIn />}></Route>
      </Routes>
    </div>
  );
}

export default App;
