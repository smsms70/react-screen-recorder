import { useState, useEffect } from "react";
import { FunctionBtns } from "./function-btns";
import { RecordBtn } from "./main-btn";
import { DownloadSection } from "./download-section";

export function RecordComponents ({}) {
  return(
    <>
    
    </>
  )
}
export function DiviceRecord ({func, setAudio, timer, download, downloadLink, stopRecord}) {
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
    console.log(time)
  }, [download]);
  return(
    <>
      <FunctionBtns
        setAudio={setAudio}
        timer={timer}
        stopRecord={stopRecord}
        getTime={getTime}
        setDownloadBox={setDownloadBox}
        />
      <RecordBtn
        func={func}
        dropdown={false}
        timer={timer}
      />
      {
        downloadBox.map((e, index) => {
          return(
          <DownloadSection
            key={index}
            download={e.download}
            downloadLink={e.downloadLink}
            time={e.time}
          />
        )})
      }
    </>
  )
}
export function UserRecord ({func, setAudio, timer, download, downloadLink, stopRecord}) {
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
    console.log(time)
  }, [download]);
  return(
    <>
      <FunctionBtns
        setAudio={setAudio}
        timer={timer}
        stopRecord={stopRecord}
        getTime={getTime}
        setDownloadBox={setDownloadBox}
        />
      <RecordBtn
        func={func}
        dropdown={false}
        timer={timer}
      />
      {
        downloadBox.map((e, index) => {
          return(
          <DownloadSection
            key={index}
            download={e.download}
            downloadLink={e.downloadLink}
            time={e.time}
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