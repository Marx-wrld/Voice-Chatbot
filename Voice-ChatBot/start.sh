# run server
cd api
npx kill-port 8000
# run python server in background
python3 app.py &
cd ..
# run react server
cd chatBotVoice
npx kill-port 5173
npm run dev
cd ..
