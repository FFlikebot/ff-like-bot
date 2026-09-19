const { Bot } = require('grammy');
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Bot is running!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

const axios = require('axios');

const BOT_TOKEN = process.env.BOT_TOKEN;
const bot = new Bot(BOT_TOKEN);

console.log("🔥 Free Fire Like Bot On Hoye Geche!");

bot.command('start', (ctx) => {
    ctx.reply("🔥 Free Fire Like Bot-এ স্বাগতম!\n\nলাইক নিতে পাঠাও: /like YOUR_UID");
});

bot.command('like', async (ctx) => {
    const uid = ctx.match.trim();

    if (!uid || !/^\d+$/.test(uid)) {
        return ctx.reply("⚠️ সঠিক UID দাও! উদাহরণ: /like 123456789");
    }

    await ctx.reply(`⏳ UID: ${uid} - এ লাইক পাঠানো হচ্ছে...`);

    try {
        const apiUrl = `https://free-fire-like-api.vercel.app/api?uid=${uid}&region=ind`;
        const response = await axios.get(apiUrl);

        if (response.data && response.data.status === 200) {
            ctx.reply(`✅ সফল হয়েছে! UID: ${uid} এ লাইক পাঠানো সম্পন্ন।`);
        } else {
            ctx.reply("❌ লাইক পাঠানো সম্ভব হয়নি। পরে চেষ্টা করো।");
        }
    } catch (error) {
        ctx.reply("⚠️ সার্ভারের সমস্যা! পরে চেষ্টা করো।");
    }
});

bot.start();
