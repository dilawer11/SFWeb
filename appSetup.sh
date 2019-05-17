if [ "$1"  == "mac" ]; then
	brew install node
	brew install npm
elif [ "$1" == "linux" ]; then
	sudo apt-get install nodejs npm
else 
	echo "Infering you have npm and nodejs installed and running the later commands"
fi
npm install
npm run serve
