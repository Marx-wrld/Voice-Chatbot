import { useVoice } from "../Context"
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faPlay, faStop} from '@fortawesome/free-solid-svg-icons'
import { useState } from "react"

export default function Message({message}) {
    const {play, isPlaying, setIsChatOnGoing, pause} = useVoice()
    const [playc, setPlayc] = useState(false)
    return(
        <li className={message.ownedByCurrentUser ? 'sent' : 'replies'}>
            <div className='bot' style={message.ownedByCurrentUser ? {float: "left"} : {float: "right"}}>
                {message.ownedByCurrentUser ? <img src="/src/images/logo.png" alt="bot" /> : <img src="/src/images/icon.png" alt="user" />}
            </div>
            <div className={message.ownedByCurrentUser ? 'bot-msg' : 'user-msg'}>
                <span>{message.body}</span>
                <div className="play-icon-bot">
                    {message.isVoice && (
                        <span>
                            <FontAwesomeIcon icon={playc ? faStop : faPlay} onClick={() => {
                                if(!isPlaying){
                                    setIsChatOnGoing(true);
                                    play(message.voice);
                                    setPlayc(true)
                                } else {
                                    pause();
                                    setPlayc(false)
                                }
                            }} />
                        </span>
                    )}
                </div>
            </div>
        </li>
    )
}