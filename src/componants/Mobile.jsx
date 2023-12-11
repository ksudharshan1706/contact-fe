import React from "react";
import "./mobile.css";
import Contacts from "./Contacts";

const Mobile = () => {
  return (
    <div className="mobileouterContainer">
      <div className="mobileinnerContainer">
        <div className="appheading">
          <div
            style={{
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              backgroundColor: "black",
            }}
          ></div>
        </div>
        <Contacts />
        <div
          style={{
            width: "50px",
            height: "50px",
            borderRadius: "50%",
            backgroundColor: "white",
            marginTop: "-20px",
            marginBottom: "20px",
            border: "2px solid",
            cursor: "pointer",
          }}
          onClick={() => window.location.reload()}
        ></div>
      </div>
    </div>
  );
};

export default Mobile;
