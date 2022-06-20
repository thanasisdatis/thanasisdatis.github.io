import "./Home.scss";

import React, { useState, useEffect } from "react";
import {
  InitliazeSmartContract,
  returnDegree,
  userJWT,
} from "../../features/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import FileUpload from "../../Components/FileUpload/FileUpload";
import Universitylogo from "../../Images/UTH-logo-english.png";
import DigitalSystems from "../../Images/DigitalSystems.png";

export const Home = () => {
  const user = useSelector(userJWT);
  const [_sha26PDF, setHash] = useState("");
  const [state, setState] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(InitliazeSmartContract());
  });

  function setPDFFile(_sha26PDF) {
    setHash(_sha26PDF);
    console.log(_sha26PDF);
  }

  // function checkDegree(e) {
  //   e.preventDefault();
  //   console.log(_sha26PDF);
  //   dispatch(returnDegree(_sha26PDF));
  // }

  function functionReturnDegree(e) {
    e.preventDefault();
    console.log(_sha26PDF);

    // const something = dispatch(returnDegree(_sha26PDF));
    // setDegree(something);
    dispatch(returnDegree(_sha26PDF));
    // .then((response) => {
    //   if (Object.keys(response).length !== 0) {
    //     console.log("HERE SOMETHING");
    //   } else {
    //     setState(false);
    //     setError("KAPPA KIPPO");
    //   }
    // })
    // .catch((error) => {
    //   setState(false);
    //   setError("THIS DEGREE IS NOT VALID");
    //   console.log(error);
    // });
  }

  return (
    <div className="home_page">
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          backgroundColor: "#edf2f7",
        }}
      >
        <img src={Universitylogo} alt="" />
        <div className="home_page_title">
          <p className="home_page_titleParagraph">
            Digital Systems Department of University of Thessaly <br />{" "}
            Blockchain Degree Verification System
          </p>
          <img
            className="home_page_digitalSystemLogo"
            src={DigitalSystems}
            alt=""
          />
        </div>
      </div>
      <div>
        <FileUpload
          setPDFFile={setPDFFile}
          action="verify"
          language="english"
        />
      </div>
      <button
        className="new_Degree"
        onClick={(e) => {
          functionReturnDegree(e);
        }}
      >
        Verify Degree
      </button>

      <div>{user.message}</div>
    </div>
  );
};
