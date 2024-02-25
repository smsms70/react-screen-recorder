import { useState, useEffect, useRef } from "react";
import { FunctionBtns } from "./function-btns";
import { RecordBtn } from "./main-btn";
import { DownloadSection } from "./download-section";
import { UserSelection } from "./user-selection.jsx";
import { useMediaRecord } from "./config/useMediaRecord.js";
import { useUserRecord } from "./config/useUserRecord.js";

export function RecordComponents ({}) {
  const [userSelection, getUserSelection] = useState('screen');
  const [RecordInSwitch, setRecordInSwitch] = useState(true);
  return(
    <>
    <section id="componets-container">
    <UserSelection 
      getUserSelection={getUserSelection}
      userSelection={userSelection}
      RecordInSwitch={RecordInSwitch}
    />
        {userSelection === 'screen' && <DiviceRecord
        setRecordInSwitch={setRecordInSwitch}
        />}
        {userSelection === 'user' && <UserRecord
        setRecordInSwitch={setRecordInSwitch}
        />}
        {userSelection === 'screen&user' && <ScreenAndUser
          
        />}
      </section>
    </>
  )
}
// RECORD SCREEN______
export function DiviceRecord ({setRecordInSwitch}) {
  const runningVideo = useRef(null);
  const [audio, setAudio] = useState(true);
  const [startRecord, setStartRecord] = useState(false);
  const [downloadLink, download, stopRecord, timer = false] = useMediaRecord(audio, startRecord, setStartRecord, setRecordInSwitch, runningVideo)

  const [time, getTime] = useState();
  const [downloadBox, setDownloadBox] = useState([]);
  
  useEffect(() => {
    if (download) {
      setDownloadBox(prev => [...prev, {
        download: download,
        downloadLink: downloadLink,
        time: time
      }])
    }
  }, [download]);
  return(
    <>
      <FunctionBtns
        setAudio={setAudio}
        timer={timer}
        stopRecord={stopRecord}
        getTime={getTime}
        downloadBox={downloadBox}
        setDownloadBox={setDownloadBox}
        />
      <RecordBtn
        startRecord={startRecord}
        setStartRecord={setStartRecord}
        timer={timer}
        runningVideo={runningVideo}
      />
      {
        downloadBox.map((e, index) => {
          return(
          <DownloadSection
            key={index}
            download={e.download}
            downloadLink={e.downloadLink}
            time={e.time}
            index={index}
            downloadBox={downloadBox}
            setDownloadBox={setDownloadBox}
          />
        )})
      }
    </>
  )
}

// RECORD USER WITH WEBCAM_______
export function UserRecord ({setRecordInSwitch}) {
  const runningVideo = useRef(null);
  const [audio, setAudio] = useState(true);
  const [startRecord, setStartRecord] = useState(false);
  const [downloadLink, download, stopRecord, timer = false] = useUserRecord(audio, startRecord, setStartRecord, setRecordInSwitch, runningVideo)

  const [time, getTime] = useState();
  const [downloadBox, setDownloadBox] = useState([]);
  
  useEffect(() => {
    if (download) {
      setDownloadBox(prev => [...prev, {
        download: download,
        downloadLink: downloadLink,
        time: time
      }])
    }
  }, [download]);
  return(
    <>
      <FunctionBtns
        setAudio={setAudio}
        timer={timer}
        stopRecord={stopRecord}
        getTime={getTime}
        downloadBox={downloadBox}
        setDownloadBox={setDownloadBox}
        />
      <RecordBtn
        startRecord={startRecord}
        setStartRecord={setStartRecord}
        timer={timer}
        runningVideo={runningVideo}
      />
      {
        downloadBox.map((e, index) => {
          return(
          <DownloadSection
            key={index}
            download={e.download}
            downloadLink={e.downloadLink}
            time={e.time}
            index={index}
            downloadBox={downloadBox}
            setDownloadBox={setDownloadBox}
          />
        )})
      }
    </>
  )
}
export function ScreenAndUser ({func}) {

  return(
    <>
      <FunctionBtns/>
      <RecordBtn
        func={func}
      />
      <DownloadSection/>
    </>
  )
}