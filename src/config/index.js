module.exports = {
  clientId: process.env.CLIENT_ID,
  guildId: process.env.GUILD_ID,
  token: process.env.BOT_TOKEN,
  database: {
    uri: process.env.MONGO_URI,
    options: {
      dbName: 'sesame-bot',
    },
  },
};
