require('dotenv').config();
const { Telegraf } = require('telegraf');

const bot = new Telegraf(process.env.BOT_TOKEN);

let waitingUsers = [];  // Queue for users waiting to chat
let chatPairs = new Map();  // user_id -> partner_id

// /start command
bot.start((ctx) => {
  ctx.reply(`
Welcome to Random Chat Bot! 🎭
You can anonymously chat with random people.

Commands:
/chat - Find a partner to chat
/endchat - End current chat
`);
});

// /chat command - start matchmaking
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

// /endchat command
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

// Forward messages between paired users
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

// Start bot
bot.launch();
console.log('Bot is running...');

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
