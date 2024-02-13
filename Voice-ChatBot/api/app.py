from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
from pydantic import BaseModel
import base64
import openai
from gtts import gTTS

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
    """this function will receive the message from Ui and send it to openai whisper ai and return the response"""
    try:
        audio_file = open("temp.mp3", "wb")
        decode_string = base64.b64decode(message.message)
        audio_file.write(decode_string)
        audio_file.close()
        file = open("temp.mp3", "rb")
        openai.api_key = message.key
        transcript = openai.Audio.translate("whisper-1", file)
        return {"message": transcript.get('text')}
    except openai.error.AuthenticationError:
        return {"message": "Incorrect API key provided in settings",
                "error": True}
    except openai.error.RateLimitError:
        return {"message": "API rate limit exceeded",
                "error": True}


class GPTData(BaseModel):
    message: str
    conversation: list
    key: str


@app.post("/get_result")
async def get_result(gpt: GPTData):
    """this function will  send the transcribed text  to openai gpt-3.5 turbo ai and return the response """
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
        tts = gTTS(text=text, lang='en', tld='com', slow=False, lang_check=False)
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
    except openai.error.RateLimitError:
        return {"message": "API rate limit exceeded",
                "error": True}

uvicorn.run(app, host="0.0.0.0", port=8000)
