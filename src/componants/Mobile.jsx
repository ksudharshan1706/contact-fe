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
      </div>
    </div>
  );
};

export default Mobile;
