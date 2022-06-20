import "./Profile.scss";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import Sidebar from "../../Components/sidebar/Sidebar";
import DatePicker from "../../Components/DatePicker/Datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  deleteUserJWT,
  createDegree,
  initialSmartContractWithSigner,
  userJWT,
} from "../../features/user/userSlice";
import { AiFillFileText } from "react-icons/ai";
import FileUpload from "../../Components/FileUpload/FileUpload";
import { _date } from "../../Components/DatePicker/Datepicker/index";

export const Profile = () => {
  const LS_KEY = "login-with-metamask:auth";
  const user = useSelector(userJWT);
  const [_sha26PDF, setHash] = useState("");
  const [_name, setName] = useState("");
  const [_surname, setSurname] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const dispatch = useDispatch();
  let navigate = useNavigate();

  useEffect(() => {
    dispatch(initialSmartContractWithSigner());
  }, []);

  function onLoggedOut() {
    localStorage.removeItem(LS_KEY);
    dispatch(deleteUserJWT);
    navigate("/");
  }

  function setPDFFile(_sha26PDF) {
    setHash(_sha26PDF);
    console.log(_sha26PDF);
  }

  function functionCreateDegree(e) {
    e.preventDefault();
    console.log(_sha26PDF);
    console.log(_name);
    console.log(_surname);
    console.log(_date.toString());

    dispatch(createDegree({ _sha26PDF, _name, _surname, _date }));
  }

  return (
    <div className="profile">
      <Sidebar />
      <div className="profile_header">
        <div className="tasks_profileHeader">
          <p>
            {" "}
            <AiFillFileText
              style={{
                color: "#b03931",
                width: 40,
                height: 40,
                paddingRight: "20px",
              }}
            />
            ΠΡΟΣΘΗΚΗ ΠΤΥΧΙΟΥ
          </p>
          {/* <img
            src={logo}
            alt=""
            style={{ width: 100, height: 100, paddingBottom: 20 }}
          /> */}
          {/* <span className="tasks_profile_name">University of Thessaly</span>
          <p>
            <button onClick={onLoggedOut}>Logout</button>
          </p> */}
        </div>
        <div className="profile_parent">
          <div className="profile_parentComponent">
            <div
              className="profile_FirstSection"
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div style={{ width: 400 }}>
                <div className="profile_parentComponentInput">
                  <p>Όνομα Φοιτητή</p>
                  <input
                    className="profile_parentComponent_Input"
                    placeholder="Όνομα"
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                  ></input>
                </div>
                <div className="profile_parentComponentInput">
                  <p>Επίθετο Φοιτητή</p>
                  <input
                    className="profile_parentComponent_Input"
                    placeholder="Επίθετο"
                    onChange={(e) => {
                      setSurname(e.target.value);
                    }}
                  ></input>
                </div>
                <div className="profile_parentComponentInput">
                  <p>Ημερομηνία Πτυχίου</p>
                  <DatePicker
                    label="Πτυχίο"
                    min="2000-08-15"
                    max="2022-08-15"
                  />
                </div>
                <div style={{ paddingTop: "20px" }}></div>{" "}
              </div>
              <div
                style={{
                  paddingLeft: "5%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {" "}
                <FileUpload
                  setPDFFile={setPDFFile}
                  action="create"
                  language="greek"
                />
              </div>
            </div>
            <div
              style={{
                marginTop: "2%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <button
                className="new_Degree"
                onClick={(e) => {
                  functionCreateDegree(e);
                }}
              >
                Προσθήκη Πτυχίου
              </button>
            </div>
          </div>
          <div>{user.createDegree}</div>
        </div>
      </div>
      {/* <p>
        Logged in as <Blockies seed="seed" />
      </p>
      <div>
        My publicAddress is <pre>"public address REDUX STATE MATE"</pre>
      </div> */}
    </div>
  );
};
