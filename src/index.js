const { Client, Collection, GatewayIntentBits } = require('discord.js');
const { token } = require('./config');
const commandHandler = require('./handlers/commandHandler');
const eventHandler = require('./handlers/eventHandler');

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.commands = new Collection();

commandHandler(client);
eventHandler(client);

client.login(token);
