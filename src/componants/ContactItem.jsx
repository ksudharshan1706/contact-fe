import React, { useContext, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import "./contacts.css";
import axios from "axios";
import UpgradeIcon from "@mui/icons-material/Upgrade";
import DeleteIcon from "@mui/icons-material/Delete";
import { context } from "../App";

const ContactItem = ({ data }) => {
  const { newcontact, setNewcontact, original, setOriginal } =
    useContext(context);
  const [edit, setEdit] = useState(true);
  const [name, setName] = useState(data.name);
  const [phone, setPhone] = useState(data.phoneno);
  const editFn = () => {
    setEdit(!edit);
  };

  const updateContact = () => {
    console.log(name, phone);
    const updateData = async () => {
      const res = await axios.put(`/contact/${data._id}`, {
        name,
        phoneno: phone,
      });
      setName(res.data.name);
      data.name = name;
      setPhone(res.data.photono);
      data.phoneno = phone;
    };
    updateData();
    setEdit(!edit);
  };

  const deleteContact = () => {
    console.log(name, phone);
    const arr = original.filter((val) => {
      console.log(val._id, data._id);
      if (val._id != data._id) {
        return val;
      }
    });
    console.log(arr);
    setOriginal(arr);
    const deleteData = async () => {
      const res = await axios.delete(`/contact/${data._id}`);
    };
    deleteData();
    setEdit(!edit);
  };

  return (
    <>
      {edit ? (
        <div className="contactItem">
          <img
            style={{ width: "50px", height: "50px", borderRadius: "50%" }}
            src="https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/no-profile-picture-icon.png"
          />
          <div>
            <p>name: {data.name}</p>
            <p>phone no: {data.phoneno}</p>
          </div>
          <EditIcon onClick={editFn} />
        </div>
      ) : (
        <div className="editItem">
          <div className="editItemname">
            <input
              defaultValue={data.name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              defaultValue={data.phoneno}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}
          >
            <UpgradeIcon onClick={updateContact} />
            <DeleteIcon onClick={deleteContact} />
          </div>
        </div>
      )}
    </>
  );
};

export default ContactItem;
