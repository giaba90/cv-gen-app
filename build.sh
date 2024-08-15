#!/bin/bash

# Assicurati che lo script fallisca se c'è un errore
set -e

# 1. Verifica che npm sia installato
if ! [ -x "$(command -v npm)" ]; then
  echo 'Error: npm non è installato.' >&2
  exit 1
fi

# 2. Aggiorna node
echo "Aggiornamento di Node.js..."

# Aggiungi il repository ufficiale NodeSource e installa l'ultima versione LTS
curl -sL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt-get install -y nodejs

# Mostra le versioni di Node.js e npm aggiornate
node -v
npm -v

echo "Aggiornamento completato!"

# 3. Esegui il build della webapp con Vite
echo "Building the webapp using Vite..."
npm install
npm run build


# 4. Sposta il contenuto delle cartelle indietro di una directory
echo "Sposta il contenuto della cartella dist/ nella root del sito"
mv dist/* ../

# 5. Conferma lo spostamento riuscito
echo "Contenuto spostato con successo."

