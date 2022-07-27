const fs = require('fs');
const path = require('path');

module.exports = (client) => {
  const eventsPath = path.join(__dirname, '..', 'events');
  const eventFiles = fs
    .readdirSync(eventsPath)
    .filter(file => file.endsWith('.js'));

  eventFiles.forEach((file) => {
    const filePath = path.join(eventsPath, file);
    // eslint-disable-next-line global-require,import/no-dynamic-require
    const event = require(filePath);

    if (event.once) {
      client.once(event.name, (...args) => event.execute(...args, client));
    }
    else {
      client.on(event.name, (...args) => event.execute(...args, client));
    }
  });
};
