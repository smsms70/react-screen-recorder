import { useState, useEffect } from "react";

export const useMediaRecord = (audio, startRecord, setStartRecord, setRecordInSwitch, runningVideo) => {
  const [download, setDownload] = useState(false);
  const [downloadLink, setDownloadLink] = useState("");
  const [timer, setTimer] = useState(false);

  const [Record, setRecord] = useState();
  const divicesMediaObj = {
    audio: audio,
    video: { frameRate: { ideal: 60 } }
  }
  useEffect(() => {
    function start () {
      navigator.mediaDevices.getDisplayMedia(divicesMediaObj)
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