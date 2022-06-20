import React from "react";
import {
  AiFillFilePdf,
  AiOutlineLoading3Quarters,
  AiTwotoneDelete,
} from "react-icons/ai";
import "./FileItem.scss";

const FileItem = ({ file, deleteFile }) => {
  const truncate = (file) =>
    file.length > 5 ? `${file.substring(0, 15)}....pdf` : file;
  return (
    <>
      <li className="file-item" key={file.name}>
        <AiFillFilePdf />
        <p className="pdf_File">{truncate(file.name)}</p>
        <div className="actions">
          <div className="loading"></div>
          {file.isUploading && (
            <AiOutlineLoading3Quarters onClick={() => deleteFile()} />
          )}
          {!file.isUploading && (
            <AiTwotoneDelete onClick={() => deleteFile()} />
          )}
        </div>
      </li>
    </>
  );
};

export default FileItem;
