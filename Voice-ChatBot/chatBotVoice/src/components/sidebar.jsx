import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear, faCheck } from "@fortawesome/free-solid-svg-icons";
import "./sidebar.css";
import { useState, useRef } from "react";
import { useVoice } from "../Context";

import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function Sidebar() {

  const [Lang, setLang] = React.useState('');

  const handleChange = (event) => {
    setLang(event.target.value);
  };

  const [sidebarClass, setSidebarClass] = useState("sidebar");
  const { setApiKey, apiKey } = useVoice();
  const [api, setApi] = useState(apiKey);
  const toggleSidebar = () => {
    setSidebarClass(sidebarClass === "sidebar" ? "sidebar active" : "sidebar");
  };
  // let right = window.innerWidth - ;
  const onSubmit = (ev) => {
    ev.preventDefault();
    localStorage.setItem("api_key", api);
    setApiKey(api);
  };
  const onApiChange = (ev) => {
    setApi(ev.target.value);
  };
  return (
    <>
      <main>
        <nav>
          <div className="nav-right hidden-xs">
            <div className="button" id="btn">
              <FontAwesomeIcon icon={faGear} onClick={toggleSidebar} />
            </div>
          </div>
        </nav>
      </main>
      <div className={sidebarClass}>
        <div className="sidebar-list">
          <form className="form">
            <div className="form-group">
              <label htmlFor="name">OpenAi Api Key: </label>
              <input
                type="text"
                name="name"
                id="name"
                autoComplete="off"
                className="form-control"
                value={api ? api : ""}
                onChange={onApiChange}
              />
              <button className="btn btn-primary" onClick={onSubmit}>
                <FontAwesomeIcon icon={faCheck} />
              </button>
            </div>
          
          </form>
        </div>
      </div>
    </>
  );
}

