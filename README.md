# ATS Resume Scanner 

An NLP-based Resume Screening System that analyzes resumes against job descriptions and provides a similarity score.

## Tech Stack

* Frontend: React
* Backend: Node.js, Express
* NLP: Custom similarity logic

## Features

* Upload resume (PDF)
* Extract text from resume
* Compare with job description
* Generate ATS score

## Project Structure

* `/Frontend` → React UI
* `/Backend` → API & NLP logic

##  Setup Instructions

### Backend

```bash
cd Backend
npm install
node server.js
```

### Frontend

```bash
cd Frontend
npm install
npm start
```

##  Future Improvements

* Better NLP (TF-IDF / embeddings)
* Authentication
* Dashboard for results

