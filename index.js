const { Bot } = require('grammy');
const axios = require('axios');
const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Bot is running live 24/7!');
});

app.listen(PORT, () => {
  console.log(`Web server listening on port ${PORT}`);
});

const BOT_TOKEN = process.env.BOT_TOKEN;
const bot = new Bot(BOT_TOKEN);

bot.command('start', (ctx) => {
  ctx.reply('🔥 Free Fire Like Bot-এ স্বাগতম!\n\nলাইক নিতে পাঠাও: /like YOUR_UID');
});

bot.command('like', async (ctx) => {
  const uid = ctx.match.trim();

  if (!uid || !/^\d+$/.test(uid)) {
    return ctx.reply('⚠️ সঠিক UID দাও! উদাহরণ: /like 12345678');
  }

  await ctx.reply(`⏳ UID: ${uid} - এ লাইক পাঠানো হচ্ছে...`);

  try {
    const apiUrl = `https://free-fire-like-api.vercel.app/like?uid=${uid}&region=sg`;
    const response = await axios.get(apiUrl);

    if (response.data && response.data.status === 200) {
      ctx.reply(`✅ সফল হয়েছে! UID: ${uid}\n👍 লাইক পাঠানো হয়েছে!`);
    } else {
      ctx.reply('⚠️ সার্ভারের সমস্যা! পরে চেষ্টা করো।');
    }
  } catch (error) {
    ctx.reply('❌ লাইক পাঠাতে ব্যর্থ হয়েছে। UID বা সার্ভার চেক করো।');
  }
});

bot.start();
