import { loadConfig } from "./misc/config.js";
import { startBot } from "./discord/bot.js";
import { loadLogger } from "./misc/logger.js";
import { transferUserDataFromOldUsersJson } from "./valorant/auth.js";
import express from "express";

/* TODO list:
 * (done) Balance
 * (done) Auto fetch skins on startup
 * (done) Skin notifier/reminder
 * (done) Auto check for new valorant version every 15 minutes
 * (done) See current bundles
 * Password encryptor
 * Inspect weapon skin (all 4 levels + videos + radianite upgrade price)
 * Option to send shop automatically every day
 * More options in config.json
 * Simple analytics to see how many servers the bot is in
 * Admin commands (delete user, see/edit everyone's alerts, etc.)
 */

const config = loadConfig();
if(config) {
    loadLogger();
    transferUserDataFromOldUsersJson();
    startBot();
}

// --- KEEP-ALIVE PING SERVER ---
const app = express();

// Simple route for uptime monitoring
app.get("/", (req, res) => {
    res.send("Bot is alive!");
});

// Listen on Railway's assigned port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Ping server running on port ${PORT}`);
});
