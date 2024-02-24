import { useState, useEffect, useContext } from "react";
import { UserSelection } from "./user-selection.jsx";
import { DiviceRecord, UserRecord, ScreenAndUser } from "./record-selections.jsx";
import "../styles/body.css";

export function Body () {
  const [userSelection, getUserSelection] = useState('screen');
  const [audio, setAudio] = useState(null);
  const [timer, setTimer] = useState(false);
  const [download, setDownload] = useState(false);
  const [downloadLink, setDownloadLink] = useState("");
  
  const [Record, setRecord] = useState();

  const recordHandler = async () => {
    const media = await navigator.mediaDevices.getDisplayMedia({
      audio: audio,
      video: { frameRate: { ideal: 60 } }
    })
    const mediarecorder = new MediaRecorder(media, {
      mimeType: 'video/webm;codecs=vp8,opus'
    })
    setRecord(mediarecorder);
    
    mediarecorder.start()
    
    setTimer(true);
    setDownloadLink("");
    setDownload(false);

    // Stop
    const [video] = media.getVideoTracks();
    
    video.addEventListener("ended", () => {
      setTimer(false);
      mediarecorder.stop()
    })

    // Download section
    mediarecorder.addEventListener("dataavailable", (e) => {
      setDownloadLink(URL.createObjectURL(e.data));
      setDownload(true);
    })
  }
  const stopRecord = () => {
    setTimer(false);
    Record.stop()
    const tracks = Record.stream.getTracks();
    tracks.forEach(track => track.stop());
  }
  return (
    <main id="main-body-container">
      <section id="componets-container">
        <UserSelection getUserSelection={getUserSelection}/>
        {userSelection === 'screen' && <DiviceRecord
          func={recordHandler}
          setAudio={setAudio}
          timer={timer}
          download={download}
          downloadLink={downloadLink}
          stopRecord={stopRecord}

        />}
        {userSelection === 'user' && <UserRecord
          func={recordHandler}
          setAudio={setAudio}
          timer={timer}
          download={download}
          downloadLink={downloadLink}
          stopRecord={stopRecord}
        />}
        {userSelection === 'screen&user' && <ScreenAndUser
          func={recordHandler}
        />}
      </section>
    </main>
  )
}