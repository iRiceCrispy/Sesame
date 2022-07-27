const fs = require('fs');
const path = require('path');

const getCommands = (dir, rel) => {
  const commandsFolder = path.join(dir, rel);
  const commandFiles = fs.readdirSync(commandsFolder);
  const commandPaths = [];

  commandFiles.forEach((file) => {
    const stat = fs.lstatSync(path.join(commandsFolder, file));
    if (stat.isDirectory()) {
      commandPaths.push(...getCommands(commandsFolder, file));
    }
    else {
      commandPaths.push(path.join(commandsFolder, file));
    }
  });

  return commandPaths;
};

module.exports = getCommands;
