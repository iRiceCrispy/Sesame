const getCommands = require('../util/getCommands');

module.exports = (client) => {
  const commandFiles = getCommands(__dirname, '../commands');

  commandFiles.forEach((file) => {
    // eslint-disable-next-line global-require,import/no-dynamic-require
    const command = require(file);
    client.commands.set(command.data.name, command);
  });
};
