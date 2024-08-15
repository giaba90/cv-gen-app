#!/bin/bash

# Assicurati che lo script fallisca se c'è un errore
set -e

# 1. Verifica che npm sia installato
if ! [ -x "$(command -v npm)" ]; then
  echo 'Error: npm non è installato.' >&2
  exit 1
fi

# 2. Aggiorna node
# Rimuovi la vecchia versione di Node.js (opzionale)
apt remove nodejs

# Aggiungi il repository di Node.js per la versione 18.x
curl -fsSL https://deb.nodesource.com/setup_18.x | -E bash -

# Installa Node.js
apt install -y nodejs

# Verifica la versione di Node.js e npm
node -v
npm -v


# 3. Esegui il build della webapp con Vite
echo "Building the webapp using Vite..."
npm install
npm run build


# 4. Sposta il contenuto delle cartelle indietro di una directory
echo "Sposta il contenuto della cartella dist/ nella root del sito"
mv dist/* ../

# 5. Conferma lo spostamento riuscito
echo "Contenuto spostato con successo."

