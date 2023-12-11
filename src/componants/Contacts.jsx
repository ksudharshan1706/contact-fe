import React, { useContext, useEffect, useState } from "react";
import "./contacts.css";
import axios from "axios";
import EditIcon from "@mui/icons-material/Edit";
import ContactItem from "./ContactItem";
import { context } from "../App";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
// import Contacts from "./Contacts";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import HorizontalRuleIcon from "@mui/icons-material/HorizontalRule";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddBoxIcon from "@mui/icons-material/AddBox";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";

const Contacts = () => {
  const {
    newcontact,
    setNewcontact,
    original,
    setOriginal,
    myContacts,
    setMyContacts,
  } = useContext(context);

  const [searchpost, setSearchpost] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const AddNewcontact = () => {
    const newContact = { name, phoneno: phone };
    const addcontact = async () => {
      try {
        const res = await axios.post(`/contact`, {
          name,
          phoneno: phone,
        });
        setOriginal([...original, newContact]);
        setMyContacts([...original, newContact]);
      } catch (err) {
        toast.error(err.response.data, {
          position: toast.POSITION.TOP_RIGHT,
        });
        console.log(err);
      }
    };
    addcontact();
    setNewcontact(!newcontact);
  };

  //fetching contacts
  useEffect(() => {
    const getData = async () => {
      const res = await axios.get("/contact");
      setMyContacts(res.data);
      setOriginal(res.data);
      res.data.sort(function (a, b) {
        if (a.name < b.name) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }
        return 0;
      });
    };
    getData();
  }, []);

  useEffect(() => {
    if (searchpost) {
      const arr = myContacts.filter((datavalue) => {
        if (datavalue.name.toLowerCase().includes(searchpost)) return datavalue;
      });
      setOriginal(arr);
    } else {
      setOriginal(myContacts);
    }
  }, [searchpost]);

  // console.log(myContacts);
  return (
    <div className="contacts">
      <div className="contact">
        {newcontact ? null : (
          <AddCircleOutlineIcon
            variant="contained"
            style={{ width: "100%", cursor: "pointer" }}
            onClick={() => setNewcontact(!newcontact)}
          >
            Add contact
          </AddCircleOutlineIcon>
        )}

        {newcontact ? (
          <>
            <div className="newcontactcss">
              <div style={{ display: "flex", flexDirection: "column" }}>
                <TextField
                  style={{ width: "90%", margin: "10px 0 10px 10px" }}
                  id="outlined-basic"
                  label="name"
                  variant="outlined"
                  onChange={(e) => setName(e.target.value)}
                />
                <TextField
                  style={{ width: "90%", margin: "10px 0 10px 10px" }}
                  id="outlined-basic"
                  label="phoneno"
                  variant="outlined"
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "50px",
                }}
              >
                <AddBoxIcon
                  variant="contained"
                  style={{
                    width: "50px",
                    marginRight: "20px",
                    cursor: "pointer",
                  }}
                  onClick={AddNewcontact}
                >
                  Add
                </AddBoxIcon>
                <RemoveCircleIcon
                  style={{
                    width: "50px",
                    marginRight: "20px",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    setNewcontact(!newcontact);
                  }}
                />
              </div>
            </div>
            <HorizontalRuleIcon style={{ width: "200px" }} />
          </>
        ) : null}
        <div className="topbarCenter">
          <div className="searchbar">
            <div>
              <i
                className="topSearchIcon fas fa-search"
                style={{ marginLeft: "10px", marginTop: "5px" }}
              ></i>
            </div>
            <input
              style={{ marginLeft: "10px", fontFamily: "Lora" }}
              placeholder="search for post"
              className="searchInput"
              onChange={(e) => setSearchpost(e.target.value)}
            />
          </div>
        </div>
        {original.map((data, index) => (
          <ContactItem data={data} key={index} />
        ))}
      </div>
      <ToastContainer />
    </div>
  );
};

export default Contacts;
