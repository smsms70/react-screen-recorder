import { useState, useEffect } from "react";
import { Dropdown } from "./dropdown";
import { VideoCamara } from "./icons";
import "../styles/main-btn.css";


export function RecordBtn ({func, timer, dropdown = true}) {
  const [quality, setQuality] = useState("none");

  return (
    <section id="main-btn-container">
      <button id="record-btn" onClick={!timer ? func : ()=>{}}>
        <VideoCamara/>
      </button>
        {dropdown && <Dropdown
          options={["1080p", "720p", "460p"]}
          setParam={setQuality}
        />}
    </section>
  )
}