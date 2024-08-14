#!/bin/bash

# Assicurati che lo script fallisca se c'è un errore
set -e

# 1. Verifica che npm sia installato
if ! [ -x "$(command -v npm)" ]; then
  echo 'Error: npm is not installed.' >&2
  exit 1
fi

# 2. Esegui il build della webapp con Vite
echo "Building the webapp using Vite..."
npm install
npm run build


# 5. Sposta il contenuto delle cartelle indietro di una directory
echo "Moving the contents of $FOLDER1 and $FOLDER2 one directory up..."
mv dist/* ../


# 6. Conferma lo spostamento riuscito
echo "Successfully moved the contents."

