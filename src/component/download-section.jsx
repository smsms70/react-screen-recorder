import { useState } from "react";
import { Circle } from "./icons";
import { Dropdown } from "./dropdown";
import "../styles/download-section.css";


export function DownloadSection ({download, downloadLink, time, index, downloadBox, setDownloadBox}) {
  const [quality, setQuality] = useState(".mp4");
  const [downloadName, setDownloadName] = useState("capture");
  const nameHandler = (event) => {
    setDownloadName(event.target.value);
  }

  const deleteHandler = () => {
    const arr = downloadBox
    const newArr = arr.filter((element) => element !== downloadBox[index])
    setDownloadBox(newArr)
  }
  const downloadedHandler = () => {
    console.log("downloaded")
  }
  return (
    <section id="download-section-container">
      <div id="download-section-text-container">
        <div className="function-btn" id="timer-box"> 
        <Circle color={"#ce0000"} />
        <span>{time}</span>
      </div>
        <input 
        type="text" 
        className="download-text" 
        onChange={nameHandler} 
        defaultValue={downloadName}
        />
        <Dropdown
            options={[ ".mp4",".webp"]}
            setParam={setQuality}
        />
      </div>
      <div id="download-btn-container">
        {download && 
        <a 
        href={downloadLink} 
        download={`${downloadName}${quality}`} 
        >
          <button id="download-btn">
            Download
          </button>
        </a>
        }
        <button id="download-btn" onClick={deleteHandler}>
          Delate
        </button>
      </div>
    </section>
  )
}