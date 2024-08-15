#!/bin/bash

# Assicurati che lo script fallisca se c'è un errore
set -e

# 1. Verifica che npm sia installato
if ! [ -x "$(command -v npm)" ]; then
  echo 'Error: npm non è installato.' >&2
  exit 1
fi

# 2. Esegui il build della webapp con Vite
echo "Mostra la versione di node"
node -v
echo "Building the webapp using Vite..."
npm install
npm run build


# 5. Sposta il contenuto delle cartelle indietro di una directory
echo "Sposta il contenuto della cartella dist/ nella root del sito"
mv dist/* ../

# 6. Conferma lo spostamento riuscito
echo "Contenuto spostato con successo."

