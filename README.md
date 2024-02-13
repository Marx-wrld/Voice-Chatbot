#  Voice Chatbot using Openai's API

The potential of voice chatbots to deliver a more personalized and interactive experience has made their adoption more and more widespread in recent years. In this blog, we will explore the features and functions of a voice chatbot that utilizes multilingual voice and text support, React, GPT-3.5 turbo language model, Whisper AI, and a Python backend with FastAPI.

![chatupdt](https://user-images.githubusercontent.com/129945593/235127475-ab72e8a8-d26b-48fd-80e1-dbc6e1a1e6ac.png)


**Multilingual Voice and Text Support**

One of the key features of this voice chatbot is its multilingual support. This makes the chatbot more accessible to a global audience because users can communicate with it in a variety of languages. Additionally, the chatbot also supports both voice and text input, allowing users to communicate in the way that is most comfortable for them.

**User Interface**

The React JavaScript framework is used to build the chatbot's front end. React is a well-liked option for creating user interfaces because of its adaptability, effectiveness, and simplicity. With React, the chatbot can provide a seamless and responsive user experience, with real-time updates and interactive elements.

**Whisper AI**

Whisper is a speech recognition model. It is a multitasking model that is capable of language identification, speech recognition across many languages, and voice translation. It was honed using a big dataset of different audio.

**GPT-3.5-Turbo**

GPT-3.5-Turbo can now accept a series of messages as input, making it possible for chatbots to provide more personalized and human-like interactions with users. This is a significant advancement in natural language processing and opens up endless possibilities for businesses to improve customer engagement and overall efficiency.

**Fast API**

FastAPI is a web framework for **building** Python RESTful APIs

. To verify, serialise, and deserialize data as well as to automatically create OpenAPI documents, FastAPI is built on Pydantic.

**Workflow of Chatbot**



1.  Receive voice messages on UI
2. Use the Whisper AI of OpenAI to convert voice to text.
3. Make a response utilising the GPT API of OpenAI.
4. Use the Google Text to Speech (gTTS) library to convert the response's text to speech.
5. Send back the spoken answer on UI.

**1. Receive voice messages on UI**

We use the **voice-recorder-react **Package to record voice and sent it to the Fast API server

**2-Fast API**

from fastapi import FastAPI

app = FastAPI()

@app.post: To create endpoints

**uvicorn.run(app, host="0.0.0.0", port=8000)**

**3 -Whisper AI to convert voice to text**

**Whisper API**

        


```
 Import openai

 audio_file = open("temp.mp3", "wb")
 decode_string = base64.b64decode("Your Voice message")
 audio_file.write(decode_string)
 audio_file.close()
 file = open("temp.mp3", "rb")
 openai.api_key = "Your API key"
 transcript = openai.Audio.translate("whisper-1", file)
```


** **

**4.Generating a response using OpenAI’s GPT API**

      


```
  openai.api_key = "Your API key"
        conversation.append({'role': 'user', 'content': "Message"})
response = openai.ChatCompletion.create(
            model=model_id,
            messages=gpt.conversation
        )
        conversation.append({'role': response.choices[0].message.role,
                                 'content': response.choices[
                                     0].message.content})
text = response.choices[0].message.content
```


**5. Google Text to Speech (gTTS) library to convert the response's text to speech.**

**      **


```
tts = gTTS(text=text, lang='en')
       tts.save("temp.mp3")
       with open("temp.mp3", "rb") as f:
       base64_bytes = base64.b64encode(f.read())
       base64_string = base64_bytes.decode('utf-8')
```


**How to install ChatBot?**

Linux:

Run the following command in the terminal


```
git clone https://github.com/cybrosystech/Voice-ChatBot.git

cd AI/Voice-ChatBot/

sudo bash setup.sh

sudo bash start.sh


```


Open your browser and go to [http://localhost:5173/](http://localhost:5173/) 

