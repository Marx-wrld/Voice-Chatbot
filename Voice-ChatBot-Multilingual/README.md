<!-- Output copied to clipboard! -->

<!-----

Yay, no errors, warnings, or alerts!

Conversion time: 0.425 seconds.


Using this Markdown file:

1. Paste this output into your source file.
2. See the notes and action items below regarding this conversion run.
3. Check the rendered output (headings, lists, code blocks, tables) for proper
   formatting and use a linkchecker before you publish this page.

Conversion notes:

* Docs to Markdown version 1.0β34
* Mon Apr 17 2023 03:39:12 GMT-0700 (PDT)
* Source doc: Learn How to Create a Voice Chatbot using Openai's API
* Tables are currently converted to HTML tables.
----->


# Learn How to Create a Voice Chatbot using Openai's API

![multi-vchatbot](https://user-images.githubusercontent.com/129945593/232473204-5303642d-96b8-41d1-8d5f-1d63254ba5e0.png)


The potential of voice chatbots to deliver a more personalized and interactive experience has made their adoption more and more widespread in recent years. In this blog, we will explore the features and functions of a voice chatbot that utilizes multilingual voice and text support, React, GPT-3.5 turbo language model, Whisper AI, and a Python backend with FastAPI.

**Multilingual Voice and Text Support**

One of the key features of this voice chatbot is its multilingual support. One will get the response in the same language as the user's input. This makes the chatbot more accessible to a global audience because users can communicate with it in a variety of languages. Additionally, the chatbot also supports both voice and text input, allowing users to communicate in the way that is most comfortable for them.

**User Interface**

The React JavaScript framework is used to build the chatbot's front end. React is a well-liked option for creating user interfaces because of its adaptability, effectiveness, and simplicity. With React, the chatbot can provide a seamless and responsive user experience, with real-time updates and interactive elements.

**Whisper AI**

Whisper is a speech recognition model. It is a multitasking model that is capable of language identification, and speech recognition across many languages and converts spoken language into written text by recognizing and transcribing it

. It was honed using a big dataset of different audio.

**GPT-3.5-Turbo**

GPT-3.5-Turbo can now accept a series of messages as input, making it possible for chatbots to provide more personalized and human-like interactions with users. This is a significant advancement in natural language processing and opens up endless possibilities for businesses to improve customer engagement and overall efficiency.

**Fast API**

FastAPI is a web framework for **building** Python RESTful APIs.

To verify, serialise, and deserialize data as well as to automatically create OpenAPI documents, FastAPI is built on Pydantic.

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

There are two methods we can use

1- Install the Whisper AI Model

2- whisper API

**Install Whisper AI Model**

 It is a multitasking model that can perform voice translation, multilingual speech recognition, and language identification. It was trained on a sizable dataset of varied audio

**Setup**

It use Python 3.9.9 and PyTorch 1.10.1 to train and test our models, but the source code must be compatible with Python 3.

8 - 3.10 and newer PyTorch versions. The codebase also relies on several Python packages, notably HuggingFace Transformers for a fast token generator and ffmpeg-python for reading audio files. You can download and install (or upgrade) the latest version of Whisper with the following command


```
pip install -U openai-whisper
```


Alternatively, the following command will pull and install the latest commit from this repository, along with its Python dependencies:


```
pip install git+https://github.com/openai/whisper.git
```


To update a package to the latest version of this repository, run:


```
pip install --upgrade --no-deps --force-reinstall git+https://github.com/openai/whisper.git
```


It also requires the ffmpeg command-line tool, which is available from most package managers, to be installed on your system:


```
# on Ubuntu or Debian
sudo apt update && sudo apt install ffmpeg

# on Arch Linux
sudo pacman -S ffmpeg

# on MacOS using Homebrew (https://brew.sh/)
brew install ffmpeg

# on Windows using Chocolatey (https://chocolatey.org/)
choco install ffmpeg

# on Windows using Scoop (https://scoop.sh/)
scoop install ffmpeg
```


You may need to install rust as well, in case tokenizers don't provide a pre-built bike for your platform. If you see installation errors during the above pip install command, install the Rust development environment according to the Getting Started page. Additionally, you may need to configure the PATH environment variable, eg export PATH="$HOME/.cargo/bin:$PATH". If installation fails without a module named 'setuptools_rust', you must install setuptools_rust, e.g. by running:


```
pip install setuptools-rust
```



```
 import whisper
 model = whisper.load_model("base")
 # load audio and pad/trim it to fit 30 seconds
 audio = whisper.load_audio("temp.mp3")
 audio = whisper.pad_or_trim(audio)
 # make log-Mel spectrogram and move to the same device as the           model.
 mel =whisper.log_mel_spectrogram(audio).to(model.device)
        # detect the spoken language
        _, probs = model.detect_language(mel)
        translation = model.transcribe(audio,
                                         language=max(probs,key=probs.get))
```


These will detect and translate the User input language 

**5. Google Text to Speech (gTTS) library to convert the response's text to speech**

**      **


```
tts = gTTS(text=text, lang='en')
       tts.save("temp.mp3")
       with open("temp.mp3", "rb") as f:
       base64_bytes = base64.b64encode(f.read())
       base64_string = base64_bytes.decode('utf-8')
```


