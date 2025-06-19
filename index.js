require('dotenv').config();
const { Telegraf } = require('telegraf');
const express = require('express');
const app = express();

const bot = new Telegraf(process.env.BOT_TOKEN);

let waitingUsers = [];
let chatPairs = new Map();

bot.start((ctx) => {
  ctx.reply(`
Welcome to Random Chat Bot! 🎭
You can anonymously chat with random people.

Commands:
/chat - Find a partner to chat
/endchat - End current chat
/users - Show active users
`);
});

bot.command('chat', (ctx) => {
  const userId = ctx.from.id;

  if (chatPairs.has(userId)) {
    ctx.reply('You are already chatting. Send /endchat to stop.');
    return;
  }

  if (waitingUsers.includes(userId)) {
    ctx.reply('You are already in queue. Please wait for a partner...');
    return;
  }

  if (waitingUsers.length > 0) {
    const partnerId = waitingUsers.shift();
    chatPairs.set(userId, partnerId);
    chatPairs.set(partnerId, userId);

    ctx.reply('🎉 Found a partner! Say hi 👋');
    bot.telegram.sendMessage(partnerId, '🎉 Found a partner! Say hi 👋');
  } else {
    waitingUsers.push(userId);
    ctx.reply('🔎 Searching for a partner...');
  }
});

bot.command('endchat', (ctx) => {
  const userId = ctx.from.id;

  if (chatPairs.has(userId)) {
    const partnerId = chatPairs.get(userId);

    chatPairs.delete(userId);
    chatPairs.delete(partnerId);

    ctx.reply('❌ You ended the chat.');
    bot.telegram.sendMessage(partnerId, '❌ Your partner ended the chat.');

  } else {
    const index = waitingUsers.indexOf(userId);
    if (index !== -1) {
      waitingUsers.splice(index, 1);
      ctx.reply('❌ You left the queue.');
    } else {
      ctx.reply('ℹ️ You are not in chat or queue.');
    }
  }
});

bot.command('users', (ctx) => {
  const waitingCount = waitingUsers.length;
  const chattingCount = chatPairs.size / 2;

  ctx.reply(`📊 Users Info:
🕒 Waiting: ${waitingCount}
💬 Chatting: ${chattingCount}`);
});

bot.on('message', (ctx) => {
  const userId = ctx.from.id;
  const partnerId = chatPairs.get(userId);

  if (partnerId) {
    if (ctx.message.text) {
      bot.telegram.sendMessage(partnerId, ctx.message.text);
    } else if (ctx.message.sticker) {
      bot.telegram.sendSticker(partnerId, ctx.message.sticker.file_id);
    } else if (ctx.message.photo) {
      bot.telegram.sendPhoto(partnerId, ctx.message.photo[ctx.message.photo.length - 1].file_id);
    } else if (ctx.message.document) {
      bot.telegram.sendDocument(partnerId, ctx.message.document.file_id);
    } else if (ctx.message.voice) {
      bot.telegram.sendVoice(partnerId, ctx.message.voice.file_id);
    } else {
      ctx.reply('Unsupported message type.');
    }
  } else {
    ctx.reply('ℹ️ You are not chatting. Send /chat to find a partner.');
  }
});

bot.launch();
console.log('Bot is running...');

// Simple HTTP server on port 3000
app.get('/', (req, res) => {
  res.send('Random Chat Bot is running 🚀');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Express server listening on port ${PORT}`);
});

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
