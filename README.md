# PREVIEW

Backend : [Dashboard](https://cv-gen-app-preview.netlify.app/admin)

E-mail : admi@example.com

Password: password

# Applicazione SPA per la generazione di curriculum vitae

Questo progetto consiste in una Single Page Application (SPA) creata per generare curriculum vitae in formato sito web. L'applicazione è sviluppata interamente utilizzando ReactJS per la gestione del frontend e garantire un'interfaccia utente reattiva e interattiva.

# Caratteristiche principali del progetto:
Implementazione del frontend con ReactJS, sfruttando componenti modulari per organizzare le varie sezioni del curriculum.
Utilizzo di Firebase per la gestione del backend, inclusi:
Autenticazione sicura degli utenti per permettere l'accesso e la modifica dei propri dati.
Integrazione di un database NoSQL in Firebase per memorizzare e recuperare i dati strutturati, come le informazioni personali, esperienze lavorative, competenze e progetti presenti nel CV.
L'applicazione permette di visualizzare e modificare i contenuti del curriculum vitae in tempo reale, con aggiornamenti dinamici grazie alla sinergia tra ReactJS e Firebase.

# SEZIONI DEL SITO

1. INTRO
2. ISTRUZIONE E FORMAZIONE
3. ESPERIENZA LAVORATIVA
4. SKILLS
5. PROGETTI
6. RECENSIONI
7. CONTATTI

# DESCRIZIONE DATABASE

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

Server: netlify

CI/CD: Github

# AUTENTICAZIONE

Ho utilizzato il servizio di Autenticazione di [Firebase](https://firebase.google.com/docs/auth?hl=it)

# DETTAGLI IMPLEMANTITIVI

Le api key sono state messe in singole variabili di ambienti di lavoro in un file .env

All'interno di un file yml è stata inserita la procedura che al push di una modifica sul branch main , builda un copia statica dell'interno sito su una vps privata.

# MAGGIORI DETTAGLI

Le skills saranno realizzate con il componente tag

Per la sezione contatti i dati saranno prelevati da database, preceduti da icona e cliccabili.

# SICUREZZA

Ho utilizzato [Synk](https://snyk.io/) per verificare la presenza di vulnerabilità conosciute nel file package.json.
Successivamente ho fixato manualmente i bug.
