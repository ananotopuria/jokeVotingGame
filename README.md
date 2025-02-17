# 🎪 Voting Game - Jokes On You! 🤡

🚀 A fun Next.js & Node.js web app where users **vote on daily jokes** using **emoji reactions**! Built with **React, Express, MongoDB, and Tailwind CSS**, this app brings humor and interactivity together.

---

## 📌 Features

### ✅ **Frontend (Next.js)**

- 🎭 **Random Joke Display** - Shows a **random joke** in a Q&A format.
- 🗳️ **Emoji Voting System** - Users **vote** on jokes with different emoji reactions.
- 🔄 **"Next Joke" Button** - Fetches a new joke from the API.
- 💾 **Persistent Voting** - Votes are stored in **localStorage**, so they remain after refresh!
- 🎨 **Modern UI** - Styled with **Tailwind CSS** and animations using **Framer Motion**.
- 📱 **Mobile Responsive** - Works great on all screen sizes!

### 🛠️ **Backend (Node.js + Express)**

- 📡 **MongoDB Database** - Stores jokes and votes.
- 🏆 **Tracks Votes Per Joke** - Each joke maintains its own voting history.
- 🌍 **CORS Enabled** - Allows frontend-backend communication.
- 🌐 **Public API Integration** - Fetches jokes from **[TeeHee.dev API](https://teehee.dev/)**.
- 🔀 **CRUD Operations** - Create, Read, Update, Delete jokes via API.

---

## 🚀 **Tech Stack**

| **Frontend**    | **Backend**        |
| --------------- | ------------------ |
| Next.js (React) | Node.js (Express)  |
| Tailwind CSS    | MongoDB (Mongoose) |
| Framer Motion   | CORS Middleware    |
| LocalStorage    | TeeHee.dev API     |

---

## ⚙️ **Installation & Setup**

### 1️⃣ **Clone the Repository**

```sh
git clone git@github.com:ananotopuria/jokeVotingGame.git
cd voting-game
```

### 2️⃣ **Backend Setup**

```sh
cd voting-game-backend
npm install
cp .env.example .env
```

Open the .env file and replace <USERNAME> and <PASSWORD> with your MongoDB credentials.
Example .env file:

```sh

MONGO_URI=mongodb+srv://<USERNAME>:<PASSWORD>@cluster0.b3lp9.mongodb.net/voting-game?retryWrites=true&w=majority&appName=Cluster0
PORT=5001

```

Run the Backend Server:

```sh
npx ts-node src/server.ts
```

### 3️⃣ **Frontend Setup**

```sh
cd ../voting-game-frontend
npm install
npm run dev
```


