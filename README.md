# DESCRIZIONE

Questa è una semplice SPA per la generazione di un curriculum vitae sotto forma di sito web.
L'intera applicazione è realizzata con l'uso di ReactJS. Per la parte di backend mi sono affidato a Firebase che gestisce l'autenticazione ed un database NOSQL che contiene i vari dati presenti in un classico currilucm vitae.

# SEZIONI

1. INTRO
2. ISTRUZIONE E FORMAZIONE
3. ESPERIENZA LAVORATIVA
4. SKILLS
5. PROGETTI
6. RECENSIONI
7. CONTATTI

# DESCRIZIONE SEZIONI

1. INTRO (summary)
   1. Breve descrizione
2. ISTRUZIONE E FORMAZIONE (education)
   1. Titolo qualifica
   2. Nome organizzazione
   3. Sito web (collegato al nome azienda)
   4. Da
   5. Al
   6. Principali materie studiate/competenze acquisite
   7. Link al file
3. ESPERIENZA LAVORATIVA (experience)
   1. Posizione ricoperta
   2. Nome azienda
   3. Sito web aziendale (collegato al nome azienda)
   4. Da
   5. Al
   6. Principali attività
   7. Skills (collegato alle sezioni skills, progetti)
4. COMPETENZE (skills)
   1. Nome della competenza
5. PROGETTI (projects)
   1. Titolo
   2. Descrizione
   3. Link a github
   4. Skills (collegato alle sezioni skills, competenze)
6. RECENSIONI (reference)
   1. Foto del cliente
   2. Nome del cliente
   3. Qualifica del clente
   4. Testo recensione
7. CONTATTI (contact)
   1. E-mail
   2. Telefono
   3. Indirizzo
   4. Profilo linkedin
   5. Foto profilo

# TECNOLOGIE USATE

Frontend:Vite + ReactJS + Chakra UI

Backend: Firebase

CMS: custom realizzato con le tecnologie sopracitate

Design/ Prototipazione : Figma

Server: VPS personale (si pensa al passaggio su aws o google cloud in secondo momento)

CI/CD: Github Actions + VPS

# AUTENTICAZIONE

Ho utilizzato il servizio di Autenticazione di [Firebase](https://firebase.google.com/docs/auth?hl=it)

# DETTAGLI IMPLEMANTITIVI

Le api key sono state messe in singole variabili di ambienti di lavoro in un file .env

All'interno di un file yml è stata inserita la procedura che al push di una modifica sul branch main , builda un copia statica dell'interno sito su una vps privata.

# MAGGIORI DETTAGLI

La sezione intro conterrà una breve descrizione su di me. Ci sarà una foto profilo; queste info saranno scritte direttamente dentro il tema

Le sezioni istruzione, esperienza e progetti saranno delle tabs una di fianco all’altra. Al click cambierà il testo del contenuto. Ognuna di queste sezioni sarà collegata con gli elementi della sezione competenze

Da decidere se le recensioni sarà fatte con un carousel o saranno fisse con un popup in hover sul nome del candidato.

Le skills saranno realizzate con il componente tag

Per la sezione contatti i dati saranno prelevati da database, preceduti da icona e cliccabili.

# SICUREZZA

Ho utilizzato [Synk](https://snyk.io/) per verificare la presenza di vulnerabilità conosciute nel file package.json.
Successivamente ho fixato manualmente i bug.
