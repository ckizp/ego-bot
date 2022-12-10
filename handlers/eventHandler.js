const fs = require('fs');
const path = require('path');

async function loadEvents(client) {
    const eventsPath = path.join(__dirname, '../events');
    const eventsFiles = fs.readdirSync(eventsPath).filter((file) => file.endsWith('.js'));
    await client.events.clear();

    for (const file of eventsFiles) {
        const filePath = path.join(eventsPath, file);
        const event = require(filePath);

        if (event.once) 
            client.once(event.name, (...args) => event.execute(...args));
        else
            client.on(event.name, (...args) => event.execute(...args));
    }
}

module.exports = { loadEvents }