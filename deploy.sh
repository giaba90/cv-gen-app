#!/bin/bash

# Configurazione
SERVER_USER=root
SERVER_IP=93.104.208.8
REMOTE_DIR=/var/www/gianlucabarranca.it/public_html

echo "Inizio il deploy su $SERVER_IP"

# Trasferisci i file buildati alla VPS
rsync -avz --exclude='node_modules' --exclude='.git' dist/ $SERVER_USER@$SERVER_IP:$REMOTE_DIR

# Esegui i comandi di deploy sulla VPS
ssh $SERVER_USER@$SERVER_IP << 'ENDSSH'
  cd /var/www/gianlucabarranca.it/public_html/cv-gen-app
  # Installa le dipendenze, se necessario
  npm install
  # Avvia o riavvia l'applicazione
  pm2 reload app || pm2 start app.js --name app
ENDSSH

echo "Deploy completato"
