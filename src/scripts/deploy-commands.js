const { REST } = require('@discordjs/rest');
const { Routes } = require('discord.js');
const { clientId, guildId, token } = require('../config');
const getCommands = require('../util/getCommands');

const commandFiles = getCommands(__dirname, '../commands');
const commands = commandFiles.map((file) => {
  // eslint-disable-next-line global-require,import/no-dynamic-require
  const command = require(file);
  return command.data;
});

const rest = new REST({ version: '10' }).setToken(token);

rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
  .then(() => console.log(`Successfully registered ${commands.length} application commands.`))
  .catch(console.error);
