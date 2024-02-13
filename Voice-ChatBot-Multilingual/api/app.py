from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
from pydantic import BaseModel
import base64
import openai
from gtts import gTTS
import whisper


model_id = "gpt-3.5-turbo"

origins = [
    "http://localhost",
    "http://localhost:5173",
]

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class Data(BaseModel):
    message: str
    key: str


@app.post("/send_message")
async def send_message(message: Data):
    try:
        audio_file = open("temp.mp3", "wb")
        decode_string = base64.b64decode(message.message)
        audio_file.write(decode_string)
        audio_file.close()
        openai.api_key = message.key

        model = whisper.load_model("base")
        # load audio and pad/trim it to fit 30 seconds
        audio = whisper.load_audio("temp.mp3")
        audio = whisper.pad_or_trim(audio)
        # make log-Mel spectrogram and move to the same device as the model
        mel = whisper.log_mel_spectrogram(audio).to(model.device)

        # detect the spoken language
        _, probs = model.detect_language(mel)
        print(max(probs, key=probs.get))
        print(f"Detected language: {max(probs, key=probs.get)}")
        translation = model.transcribe(audio,
                                       language=max(probs, key=probs.get))
        return {"message": translation.get('text')}
    except openai.error.AuthenticationError:
        return {"message": "Incorrect API key provided in settings",
                "error": True}


class GPTData(BaseModel):
    message: str
    conversation: list
    key: str


@app.post("/get_result")
async def get_result(gpt: GPTData):
    try:
        openai.api_key = gpt.key
        gpt.conversation.append({'role': 'user', 'content': gpt.message})
        response = openai.ChatCompletion.create(
            model=model_id,
            messages=gpt.conversation
        )
        gpt.conversation.append({'role': response.choices[0].message.role,
                                 'content': response.choices[
                                     0].message.content})
        text = response.choices[0].message.content
        tts = gTTS(text=text, lang='en')
        tts.save("temp.mp3")
        with open("temp.mp3", "rb") as f:
            base64_bytes = base64.b64encode(f.read())
            base64_string = base64_bytes.decode('utf-8')
        return {"conversation": gpt.conversation,
                "message": response.choices[0].message.content,
                "voice": base64_string}
    except openai.error.AuthenticationError as e:
        return {"conversation": gpt.conversation,
                "message": "Incorrect API key provided in settings",
                "error": True}

uvicorn.run(app, host="0.0.0.0", port=8000)
