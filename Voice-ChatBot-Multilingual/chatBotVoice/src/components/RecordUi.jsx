import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMicrophone, faMicrophoneSlash } from "@fortawesome/free-solid-svg-icons";
import { useVoice } from "../Context";

// Recorder UI component
export default function RecorderUI({
  time,
  stop,
  data,
  start,
  pause,
  resume,
  paused,
  recording
}) {
  const audioRef = useRef(null);
  const {setVoice, addChat, convo, setConvo, play, setIsChatOnGoing, isChatOnGoing, setIsChatLoading, apiKey} = useVoice();
  const [userChat, setUserChat] = useState("");
  const onRecord = async () => {
    if (recording) {
      await stop();
      setIsChatOnGoing(true);
    } else {
      start();
    }
  }
  useEffect(() => {
    if (data.url && audioRef.current) {
      audioRef.current.src = data.url;
      var reader = new window.FileReader();
        reader.readAsDataURL(data.blob); 
        reader.onloadend = function() {
        let base64 = reader.result;
        base64 = base64.split(',')[1];
        setVoice(base64);
        fetch("http://localhost:8000/send_message", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                message: base64,
                key: apiKey
            })
        }).then(res => res.json()).then(data => {
            addChat({
                body: data.message,
                ownedByCurrentUser: false,
                isVoice: true,
                voice: base64,
            })
            setUserChat(data.message);
        })
      }
    }
  }, [data.url]);

  useEffect(() => {
    if (userChat.length > 0) {
        setIsChatLoading(true)
        fetch("http://localhost:8000/get_result", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    message: userChat,
                    conversation: convo,
                    key: apiKey
                })
            }).then(res => res.json()).then(async(data) => {
              setIsChatLoading(false)
                addChat({
                    body: data.message,
                    ownedByCurrentUser: true,
                    isVoice: true,
                    voice: data.voice,
                })
                await play(data.voice)
                setConvo(data.conversation);
            })
        }
    }, [userChat]);

  return (
    <>
      <button type="button" className={ recording ? "red": ''} onClick={onRecord} disabled={isChatOnGoing || !apiKey}>
        {recording ? (<FontAwesomeIcon icon={faMicrophoneSlash}/>) : (<FontAwesomeIcon icon={faMicrophone}/>)}
      </button>

      <audio ref={audioRef} hidden />
    </>
  );
}
