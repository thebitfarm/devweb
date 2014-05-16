#!/bin/bash

# needs to be run manually

#sudo apt-get install python g++ make checkinstall
#src=$(mktemp -d) && cd $src
#wget -N http://nodejs.org/dist/node-latest.tar.gz
#tar xzvf node-latest.tar.gz && cd node-v*
#./configure
#fakeroot checkinstall -y --install=no --pkgversion $(echo $(pwd) | sed -n -re's/.+node-v(.+)$/\1/p') make -j$(($(nproc)+1)) install
#sudo dpkg -i node_*

#curl -L https://npmjs.org/install.sh | sudo sh


# REST API server
sudo npm -g install sails

# Bunyan logger for restify
#sudo npm install -g bunyan

# MongoDB
sudo npm install -g mongodb 

# MongoDB ORM
#sudo npm install -g mongoose

# ember-tools
sudo npm install -g ember-tools

# bower
sudo npm install -g bower

# NodeJS ORM2
#sudo npm install -g orm

# NodeJS unit test with APIeasy for REST
#sudo npm install -g vows
#sudo npm install api-easy

openssl genrsa -out server-key.pem 2048
openssl req -new -key server-key.pem -out server-csr.pem
openssl x509 -req -in server-csr.pem -signkey server-key.pem -out server-cert.pem