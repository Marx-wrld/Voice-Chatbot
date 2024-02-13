import { createContext, useContext, useState, useEffect } from "react";

const Context = createContext();

export default function ContextProvider({ children }){
    const [voice, setVoice] = useState(false)
    const [chats, setChats] = useState(JSON.parse(localStorage.getItem("chat")) || []);
    const [convo, setConvo] = useState(JSON.parse(localStorage.getItem("convo")) || []);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isChatOnGoing, setIsChatOnGoing] = useState(false);
    const [isChatLoading, setIsChatLoading] = useState(false);
    const [apiKey, setApiKey] = useState(localStorage.getItem("api_key") || false);
    const [currentAudio, setCurrentAudio] = useState(null);
    const addChat = (chat) => {
        setChats([...chats, chat]);
        localStorage.setItem("chat", JSON.stringify([...chats, chat]));
    }
    const play = async (voice) => {
        var snd = new Audio("data:audio/mp3;base64," + voice);
        setCurrentAudio(snd);
        setIsPlaying(true)
    }
    const pause = async () => {
        await currentAudio.pause();
        setIsPlaying(false);
        setIsChatOnGoing(false);
    }
    useEffect(() => {
        if(currentAudio){
            currentAudio.addEventListener('ended', () => {
                setIsPlaying(false)
                setIsChatOnGoing(false);
            })
            currentAudio.play();
        }
    }, [currentAudio])

    return(
        <Context.Provider value={{voice, setVoice, chats, addChat, convo, setConvo, play, isPlaying, isChatOnGoing, setIsChatOnGoing, pause,
            isChatLoading, setIsChatLoading, apiKey, setApiKey}}>
            {children}
        </Context.Provider>
    )
}

export const useVoice = () => useContext(Context)