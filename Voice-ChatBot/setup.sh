# get node version to a variable
node_version=node -v
# check if node version is greater than 19.0.0
if [ ${node_version:1:2} -ge 19 ]; then
echo "Node Requirement is satisfied"
# else check node exist
elif [ -x "$(command -v node)" ]; then
sudo npm cache clean -f
sudo npm install -g n
sudo n stable
# install node latest version
echo "Installing Node"
sudo apt install nodejs
sudo apt install npm
fi
pip install -r requirement.txt
cd chatBotVoice
npm install
cd ..
