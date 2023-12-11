import logo from "./logo.svg";
import "./App.css";
import Mobile from "./componants/Mobile";
import { createContext, useContext, useState } from "react";

export const context = createContext();
function App() {
  const [newcontact, setNewcontact] = useState(false);
  const [original, setOriginal] = useState([]);
  const [myContacts, setMyContacts] = useState([]);
  return (
    <context.Provider
      value={{
        newcontact,
        setNewcontact,
        original,
        setOriginal,
        myContacts,
        setMyContacts,
      }}
    >
      <div className="App">
        <Mobile />
      </div>
    </context.Provider>
  );
}

export default App;
