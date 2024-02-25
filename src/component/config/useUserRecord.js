import { useState, useEffect } from "react";

export const useUserRecord = (audio, startRecord, setStartRecord, setRecordInSwitch, runningVideo) => {
  const [download, setDownload] = useState(false);
  const [downloadLink, setDownloadLink] = useState("");
  const [timer, setTimer] = useState(false);

  const [Record, setRecord] = useState();

  const divicesMediaObj = {
    audio: audio,
    video: { 
      facingMode: "user", 
      width: { min: 640, ideal: 1280, max: 1920 },
      height: { min: 480, ideal: 720, max: 1080 } 
    } 
  };

  useEffect(() => {
    function start () {
      navigator.mediaDevices.getUserMedia(divicesMediaObj)
      .then(media => {

        const mediarecorder = new MediaRecorder(media, {
          mimeType: 'video/webm;codecs=vp8,opus'
        })
        setRecord(mediarecorder);
        
        mediarecorder.start()
        
        //video element what is being captured by the webcam
        runningVideo.current.srcObject = media;
        runningVideo.current.onloadedmetadata = () => {
          runningVideo.current.play();
        };
      
        setTimer(true);
        setDownloadLink("");
        setDownload(false);
        setRecordInSwitch(false);
        
        // Stop
        const [video] = media.getVideoTracks();
        
        video.addEventListener("ended", () => {
          setTimer(false);
          mediarecorder.stop();
          setRecordInSwitch(true);
          setStartRecord(false);
          
        })
    
        // Download section
        mediarecorder.addEventListener("dataavailable", (e) => {
          setDownloadLink(URL.createObjectURL(e.data));
          setDownload(true);
        })
      })
      .catch(err => {
        setStartRecord(false);
        return console.error(err);
      })
    }
    if (startRecord) start()
  }, [startRecord])

//  END OF THE USEEFFECT
  const stopRecord = () => {
    if (Record) {
      setTimer(false);
      Record.stop()
      const tracks = Record.stream.getTracks();
      tracks.forEach(track => track.stop());
      setRecordInSwitch(true);
      setStartRecord(false);
    }
  }
  return ([downloadLink, download, stopRecord, timer])
}