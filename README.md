# LikeMe Project

This project is a web application that displays posts as cards with a title, image, description, and likes counter.

- The **frontend**, built with React and Vite, was already provided.
- The **backend** has been created in this project using Node.js, Express, and PostgreSQL.

### Features implemented:
- View all posts
- Create new posts via a form

### Coming soon:
- Like posts
- Delete posts


# Project Setup and Run

1. Make sure PostgreSQL is installed and a database named `likeme` exists. If it doesn't:
```sql
CREATE DATABASE likeme;
CREATE TABLE posts (
 id SERIAL PRIMARY KEY,
 titulo VARCHAR(25),
 img VARCHAR(1000),
 descripcion VARCHAR(255),
 likes INT
);
```
2. Clone the repository
```bash
git clone https://github.com/Micolia/likeme-app
```
3. Inside the backend folder, create a `.env` file based on `.env.local` and add your PostgreSQL user and password
4. Install dependencies and start the backend server
```bash
cd backend
npm install
node index.js
```

The backend will run at http://localhost:3000

5. Install dependencies and start the frontend development server
```bash
cd frontend
npm install
npm run dev
```
Open the URL displayed in the console in your browser.
