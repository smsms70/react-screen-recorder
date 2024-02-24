import { useState, useEffect } from "react";
import { Circle } from "./icons";
import { Dropdown } from "./dropdown";
import "../styles/download-section.css";


export function DownloadSection ({download, downloadLink, time}) {
  const [quality, setQuality] = useState(".mp4");
  const [downloadName, setDownloadName] = useState("capture");
  const nameHandler = (event) => {
    setDownloadName(event.target.value);
  }
  return (
    <section id="download-section-container">
      <div id="download-section-text-container">
        <div className="function-btn" id="timer-box"> 
        <Circle color={"#ce0000"} />
        <span>{time}</span>
      </div>
        <input type="text" name="" className="download-text" onChange={nameHandler} defaultValue={downloadName}/>
        <Dropdown
            options={[ ".mp4",".webp"]}
            setParam={setQuality}
          />
      </div>
      <div id="download-btn-container">
        {download && <a href={downloadLink} download={`${downloadName}${quality}`}>
          <button id="download-btn">
            Download
          </button>
        </a>}
      </div>
    </section>
  )
}