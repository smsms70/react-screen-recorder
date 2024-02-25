import { VideoCamara } from "./icons";
import "../styles/main-btn.css";


export function RecordBtn ({startRecord, setStartRecord, timer, runningVideo}) {

  const startRecordHandler = () => {
    if(!timer) {
      setStartRecord(true);
    }
  }

  return (
    <>
    <section 
    id="main-btn-container" 
    className={startRecord ? "for-video" : ""}
    >
      {
      !startRecord 
      ? 
      <button id="record-btn" onClick={startRecordHandler}>
        <VideoCamara/>
      </button> 
      : 
      <video src="" id="video-running" ref={runningVideo}></video>
      }
      
    </section>
    </>
  )
}