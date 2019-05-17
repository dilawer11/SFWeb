if [ "$1"  == "mac" ]; then
	brew install node
	brew install npm
	brew install git
elif [ "$1" == "linux" ]; then
	sudo apt-get install nodejs npm
	sudo apt-get install git
else 
	echo "Infering you have npm and nodejs installed and running the later commands"
fi
git clone https://github.com/dilawer11/SFWeb.git
cd SFWeb
if [ "$2" != ""]; then
	cp $2/* src/ 
	npm install 
	npm run serve
else
	echo "Please Copy Paste The firebase folder from src/firebase in  USB to SFWeb/src"
fi
