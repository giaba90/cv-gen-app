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
   1. Nome
5. PROGETTI (projects)
   1. Titolo
   2. Descrizione
   3. Link a github
   4. Skills (collegato alle sezioni skills, competenze)
6. RECENSIONI (reference)
   1. Foto
   2. Nome
   3. Qualifica
   4. Descrizione
7. CONTATTI (contact)
   1. E-mail
   2. Telefono
   3. Indirizzo
   4. Profilo linkedin

# MAGGIORI DETTAGLI

La sezione intro conterrà una breve descrizione su di me. Ci sarà una foto profilo; queste info saranno scritte direttamente dentro il tema

Le sezioni istruzione, esperienza e progetti saranno delle tabs una di fianco all’altra. Al click cambierà il testo del contenuto. Ognuna di queste sezioni sarà collegata con gli elementi della sezione competenze

Da decidere se le recensioni sarà fatte con un carousel o saranno fisse con un popup in hover sul nome del candidato.

Le skills saranno realizzate con il componente tag

Per la sezione contatti i dati saranno prelevati da database, preceduti da icona e cliccabili.

# TECNOLOGIE USATE

Frontend: ReactJS + Chakra UI

Backend: Nodejs (o PHP) + Firebase

CMS: custom realizzato con le tecnologie sopracitate

Design/ Prototipazione : Figma

Server: VPS personale (si pensa al passaggio su aws o google cloud in secondo momento)

CI/CD: Github repo privato e poi sarà pubblico

# API

**Education**

- admin/education/create
  - Crea un nuovo titolo di studio
- admin/education/edit/:id
  - Modifica un titolo di studio
- admin/education/delete/:id
  - Elimina un titolo di studio
- admin/education/get
  - Restituisce tutti i titoli di studio
- admin/education/get/:id
  - Restituisce un singolo titolo di studio

**Experience**

- admin/experience/create
  - Crea una nuova esperienza
- admin/experience/edit/:id
  - Modifica una esperienza
- admin/experience/delete/:id
  - Elimina una esperienza
- admin/experience/get
  - Restituisce tutti l’esperienze
- admin/experience/get/:id
  - Restituisce una singola esperienza

**Projects**

- admin/project/create
  - Crea un nuovo progetto
- admin/project/edit/:id
  - Modifica un progetto
- admin/project/delete/:id
  - Elimina un progetto
- admin/project/get
  - Restituisce tutti i progetti
- admin/project/get/:id
  - Restituisce un singolo progetto

**Contact detail**

- admin/contact/create
  - Crea un nuovo contatto
- admin/contact/edit/:id
  - Modifica un contatto
- admin/contact/delete/:id
  - Elimina un contatto
- admin/contact/get
  - Restituisce tutti i titoli di studio

# AUTENTICAZIONE

Ho utilizzato il servizio di Autenticazione di [Firebase](https://firebase.google.com/docs/auth?hl=it)

# DETTAGLI IMPLEMANTITIVI

# GRAFICA

# SICUREZZA

Ho utilizzato [Synk](https://snyk.io/) per verificare la presenza di vulnerabilità conosciute nel file package.json.
Successivamente ho fixato manualmente i bug.
