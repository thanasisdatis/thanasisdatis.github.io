import React, { useState, useRef } from "react";
import "./FileUpload.scss";
import SHA256 from "crypto-js/sha256";
import { ethers } from "ethers";
import { AiOutlineUpload } from "react-icons/ai";
import FileItem from "../FileItem/FileItem";
import { returnDegree } from "../../features/user/userSlice";
import { useDispatch } from "react-redux";

const FileUpload = (props) => {
  const ref = useRef();
  const dispatch = useDispatch();
  const [_sha26PDF, setHash] = useState(""); // state variable to set account.
  const [choosedFiles, setChoosedFiles] = useState({});
  const [fileExist, setFileExist] = useState(false);

  function checkDegree() {
    console.log(_sha26PDF);
    dispatch(returnDegree(_sha26PDF));
  }

  function deleteFile() {
    ref.current.value = "";
    setHash("");
    setChoosedFiles({});
    setFileExist(false);
  }
  // ! IMPORTANT!!! import this from redux state. I have to create a redux function that
  // ! returns all of these functions and its about web3Client
  // function getDegree(e) {
  //   e.preventDefault();
  //   returnDegree(_sha26PDF);
  // }

  function onChange(e) {
    let files = e.target.files[0];
    setChoosedFiles(files);
    setFileExist(true);
    let fileReader = new FileReader();

    fileReader.addEventListener("loadend", (evt) => {
      if (evt.target.readyState === FileReader.DONE) {
        const hash = SHA256(fileReader.result);
        console.log("HELLos");
        console.log(typeof hash);
        const newHash = ethers.utils.hexlify(
          ethers.utils.toUtf8Bytes(hash.toString().slice(32))
        );
        setHash(newHash);
        props.setPDFFile(newHash);
      }
    });

    fileReader.readAsDataURL(files);
  }

  return (
    <>
      <div className="fileUploadComponent">
        <div className="file_card">
          {props.language === "english" ? (
            <p className="main">Type: PDF</p>
          ) : (
            <p className="main">Μορφή PDF</p>
          )}
          {/* <p className="main">Μορφή PDF</p> */}
          <div className="file_inputs">
            <input
              ref={ref}
              type="file"
              accept="application/pdf"
              onChange={(e) => onChange(e)}
            />
            <button>
              <i>
                <AiOutlineUpload style={{ width: 100, height: 100 }} />
              </i>
              Upload
            </button>
          </div>

          {fileExist ? (
            <FileItem file={choosedFiles} deleteFile={deleteFile} />
          ) : (
            <div />
          )}
          {/* {props.action === "verify" ? (
            <button
              className="create_Button"
              onClick={(e) => {
                props.functionReturnDegree(e);
              }}
            >
              Έλεγχος εγκυρότητας
            </button>
          ) : (
            <button
              className="create_Button"
              onClick={(e) => {
                props.functionCreateDegree(e);
              }}
            >
              Προσθήκη πτυχίου
            </button>
          )} */}
        </div>
        {/* <div className="fileUploadComponent_Verification_answer">
          <p>Degree was verified successfully.</p>
          <p>Name: Thanasis</p>
          <p>Surname: Ntatis</p>
          <p>Date: 12/3/2021</p>
        </div> */}
      </div>
    </>
  );
};

export default FileUpload;
