import Messages from "./Messages";
import { useRef } from "react";
import Recorder from "voice-recorder-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { useVoice } from "../Context";
import { useState, useEffect } from "react";

import RecorderUI from "./RecordUi";
import Sidebar from "./sidebar";

export default function ChatFrame (){
    const [userChat, setUserChat] = useState("");
    let mesgRef = useRef(null);
    const {addChat, convo, setConvo, play, setIsChatLoading, setIsChatOnGoing, isChatOnGoing, apiKey} = useVoice();
    const onSend = (ev) => {
        ev.preventDefault();
        if(mesgRef.current.value.length > 0){
            let mesg = mesgRef.current.value;
            mesgRef.current.value = "";
                addChat({
                    body: mesg,
                    ownedByCurrentUser: false,
                    is_voice: false,
                    voice: false
                })
                setUserChat(mesg);
                setIsChatOnGoing(true);
        }
    }

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
            }).then(res => res.json()).then(data => {
                setIsChatLoading(false);
                addChat({
                    body: data.message,
                    ownedByCurrentUser: true,
                    isVoice: data.error ? false : true,
                    voice: data.voice,
                })
                if(!data.error){
                    play(data.voice);
                    setConvo(data.conversation);
                }
                else {
                    setIsChatOnGoing(false);
                }
            })
        }
    }, [userChat]);
    
    return(
        <div id="frame">
            <div className="content">
                <div className="contact-profile">
                    <div className="profile-m-head">
                        <img src="/src/images/logo.png" alt="g2"/>
                        <span>Marx</span>
                    </div>
                    <div className="setting-icon">
                        <Sidebar/>
                    </div>
                </div>
                <Messages/>
                <div className="message-input">
                    <div className="chat-input">
                        <input type="text" placeholder="Enter your message." ref={mesgRef} onKeyDown={
                            (ev) => {
                                if(ev.key === "Enter" && !isChatOnGoing && apiKey){
                                    onSend(ev);
                                }
                            }
                        }/>
                        <ul className="chat-controls">
                            <li></li>
                            <li>
                            <button className="submit submit-btn" onClick={onSend} disabled={isChatOnGoing || !apiKey}>
                                    <FontAwesomeIcon icon={faPaperPlane}/>
                                </button>
                            </li>
                            <li>
                            <Recorder Render={RecorderUI}/>

                            </li>

                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}
