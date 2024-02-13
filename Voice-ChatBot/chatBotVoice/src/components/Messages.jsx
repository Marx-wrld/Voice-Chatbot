import { useVoice } from "../Context"
import Loading from "./Loading"
import Message from "./Message"

export default function Messages(props) {
    const {chats, isChatLoading, apiKey} = useVoice()
    return(
		<div className="messages">
            {!apiKey.length && 
                <div className="no-messages">
                    <h3>No Api key found. Please add an api key</h3>
                </div>
            }
            {!chats.length && 
                <div className="no-messages">
                    <h3>No messages yet</h3>
                </div>
            }
            {chats && apiKey && <ul>
                {chats.map((message, index) => (
                    <Message message={message} key={index} />
                ))}
                {isChatLoading && <Loading/>}
            </ul>}
        </div>
    )
}