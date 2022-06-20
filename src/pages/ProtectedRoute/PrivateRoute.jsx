import React, { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import { useDispatch } from "react-redux";
import { checkIfUserIsvalid } from "../../features/user/userSlice";
import PrivateRouteAuthenticate from "./PrivateRouteAuthenticate";

function PrivateRoute() {
  const dispatch = useDispatch();
  const [auth, setAuth] = useState(false);
  const [something, setSomething] = useState(false);
  const LS_KEY = "login-with-metamask:auth";

  useEffect(() => {
    let accessToken = localStorage.getItem(LS_KEY);
    if (accessToken) {
      const payload = jwtDecode(accessToken);
      const url = `http://localhost:5000/users/${payload.payload.id}`;
      async function test() {
        await dispatch(checkIfUserIsvalid({ url, accessToken })).then(
          (exist) => {
            if (exist) {
              setAuth(true);
              setSomething(true);
            }
          }
        );
      }
      test();
    } else {
      console.log("else");
      setAuth(false);
      setSomething(true);
    }

    console.log("HERE");
  }, []);

  if (something) return <PrivateRouteAuthenticate auth={auth} />;
}
export default PrivateRoute;
