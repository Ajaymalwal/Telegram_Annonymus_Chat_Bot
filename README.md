

markdown
# 🤖 Telegram Anonymous Chat Bot

Welcome to the **Telegram Anonymous Chat Bot**! 🌐  
A Node.js-powered Telegram bot that connects two random users anonymously for private one-on-one chats — all through Telegram! No identities, no strings attached.

![Node.js](https://img.shields.io/badge/Built%20with-Node.js-green?logo=node.js)
![Express](https://img.shields.io/badge/Backend-Express.js-black?logo=express)
![Telegram](https://img.shields.io/badge/Telegram-Bot-blue?logo=telegram)
![License](https://img.shields.io/github/license/Ajaymalwal/Telegram_Annonymus_Chat_Bot)

---

## ✨ Features

- 🕵️ Anonymous matchmaking between users
- 🗨️ Real-time chat relay using Telegram's Bot API
- 🔄 Easy exit and re-entry into chat queues
- ✅ Simple and intuitive command-based interaction
- ⚡ Fast and lightweight Express.js backend

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/Ajaymalwal/Telegram_Annonymus_Chat_Bot.git
cd Telegram_Annonymus_Chat_Bot


### 2. Install Dependencies

Ensure you have [Node.js](https://nodejs.org/) installed, then run:

```bash
npm install
```

### 3. Set Up Environment

Create a `.env` file in the root directory and add your bot token:

```
BOT_TOKEN=your_telegram_bot_token_here
```

You can obtain a Telegram bot token from [@BotFather](https://t.me/BotFather).

### 4. Run the Bot

```bash
node index.js
```

Your bot should now be live and ready to start anonymously connecting users! 🎉

---

## 🧪 Available Commands

| Command    | Description                          |
|------------|--------------------------------------|
| `/start`   | Start the bot and get instructions   |
| `/find`    | Enter matchmaking queue              |
| `/leave`   | Leave the current chat               |
| `/help`    | Show help message                    |

---

## 🛠 Built With

- 🟢 [Node.js](https://nodejs.org/)
- ⚙️ [Express.js](https://expressjs.com/)
- 📬 [Telegram Bot API](https://core.telegram.org/bots/api)
- 💾 In-memory matchmaking logic using JavaScript maps

---

## 📌 Project Structure

```
Telegram_Annonymus_Chat_Bot/
├── index.js           # Main entry point
├── .env               # Environment config
├── package.json       # Dependencies and scripts
└── README.md          # Project documentation
```

---

## 🧩 Future Improvements

- ✅ Persistent storage (e.g., Redis or MongoDB)
- 🔒 Better spam handling and abuse prevention
- 🌍 Deploy to a serverless platform (e.g. Render, Railway)

---

## 📜 License

This project is licensed under the [MIT License](LICENSE).

---

## 🤝 Contributing

Found a bug? Have a feature request? Feel free to open an issue or submit a PR!  
Contributions are welcome and appreciated 🙌

---

## 🧑‍💻 Author

Made with ❤️ by [Ajay Malwal](https://github.com/Ajaymalwal)

---

## ⭐️ Show Some Love

If you found this project useful, consider giving it a star ⭐ on GitHub!

```
