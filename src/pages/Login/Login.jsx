import React, { useState, useEffect } from "react";
import { login } from "../../features/user/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./Login.scss";

function LogIn() {
  const [loading, setLoading] = useState(false); // Loading button state
  const dispatch = useDispatch();
  const [startDate, setStartDate] = useState(new Date());
  let navigate = useNavigate();

  function handleClick() {
    async function LogIn() {
      await dispatch(login()).unwrap();
      navigate("/degrees");
    }
    LogIn();
  }
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <p>Only MetaMask login is implemented.</p>
      <button className="Login-button Login-mm" onClick={handleClick}>
        {loading ? "Loading..." : "Login with MetaMask"}
      </button>
      <DatePicker
        selected={startDate}
        onChange={(date) => setStartDate(date)}
      />
    </div>
  );
}

export default LogIn;
