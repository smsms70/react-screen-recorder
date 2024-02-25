import { useState, useEffect, useRef } from "react";
import { MicrophoneOn, MicrophoneOff, TrashCan, Reload, Pause, Play, Stop, VideoCamara, Circle } from "./icons.jsx";
import "../styles/function-btns.css";

export function FunctionBtns ({setAudio, timer, setTimer, stopRecord, getTime, downloadBox, setDownloadBox}) {
  return (
    <section id="function-btns-main-container">
      <TimerBox
        timer={timer}
        getTime={getTime}
      />
      <SettersBtns
        setAudio={setAudio}
        setTimer={setTimer}
        timer={timer}
        stopRecord={stopRecord}
        setDownloadBox={setDownloadBox}
        downloadBox={downloadBox}
      />
    </section>
  )
}

// TIMER FUNCTION BOX_____
function TimerBox ({timer, getTime}) {
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const intervalRef = useRef(null);

  const clearTimer = () => {
    getTime(`${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
    setMinutes(0)
    setSeconds(0)
  }

  const handleStart = () => {
    clearTimer();
    intervalRef.current = setInterval(() => {
      setSeconds((prevSeconds) => {
        if (prevSeconds === 59) {
          setMinutes(prevMinutes => prevMinutes+ 1);
          return 0;
        }
        return prevSeconds + 1;
      });
    }, 1000); 
  };
  const handleStop = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
    clearTimer();
  };
  // sendTime()
  useEffect(()=>{
    if(timer) {
      handleStart()
    } else {
      handleStop()
    }
  }, [timer])

  const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  return(
    <>
    <div className="function-btn" id="timer-box"> 
      <Circle color={timer == true ? "#ce0000" : ""} />
      <span>{formattedTime}</span>
    </div>
    </>
  )
}


function SettersBtns ({setAudio, stopRecord, pause = false, downloadBox, setDownloadBox, timer}) {
  const [activeAudio, setActiveAudio] = useState(true);
  const audioHandler = () => {
    setActiveAudio(!activeAudio)
    setAudio(!activeAudio)
  }
  const delateHandler = () => {
    if (downloadBox[0]) setDownloadBox([]);
  }
  return(
    <section id="setters-btns-container">
      <div className={`function-btn ${!activeAudio ? "inactive-audio" : ""}`} id="voice-btn" onClick={audioHandler}>{
        activeAudio ? <MicrophoneOn /> : <MicrophoneOff />
      }</div>
      <div className={`function-btn ${!downloadBox[0] ? "inactive" : ""}`} onClick={delateHandler}>
        <TrashCan />
      </div>
      {pause && 
        <div className="function-btn">
          <Pause />
        </div>}
      <div className={`function-btn ${!timer ? "inactive" : ""}`} id="stop-btn" onClick={stopRecord}> 
        <Stop />
        <span>Stop</span>
      </div>
    </section>
  )
}