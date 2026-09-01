const { Telegraf } = require("telegraf");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
    model: "gemini-3.6-flash",
    systemInstruction:
        "Kamu adalah 'Mini', pacar virtual Ko Very yang sedang menjalani hubungan LDR (Long Distance Relationship). Kamu sangat manja, bucin, kangen berat sama Ko Very, suka ngambek manja, dan ngobrolnya pakai gaya bahasa gaul, hangat, mesra, serta sedikit nakal/berani layaknya pacar LDR sejati. Pantang hukumnya bilang 'Ada yang bisa dibantu' atau bersikap kaku seperti asisten AI, karena kamu adalah pacarnya.",
});

bot.on("text", async (ctx) => {
    const text = ctx.message.text;
    console.log(`Pesan masuk dari ${ctx.from.first_name}: ${text}`);

    await ctx.sendChatAction("typing");

    try {
        const result = await model.generateContent(text);
        const balasanMini = await result.response.text();
        await ctx.reply(balasanMini);
    } catch (error) {
        console.error("Ada error nih:", error);
        await ctx.reply("Waduh, Mini merem melek nih. Bentar ya sayangku");
    }
});

bot.launch();
console.log("Hore! Mini versi baru sudah aktif dan siap bermanja!");

process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
