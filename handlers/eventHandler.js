async function loadEvents(client) {
    const fs = require('fs');
    const path = require('path');
    const ascii = require('ascii-table');
    const table = new ascii().setHeading('Events', 'Status')

    const eventsPath = path.join(__dirname, '../events');
    const eventsFiles = fs.readdirSync(eventsPath).filter((file) => file.endsWith('.js'));
    await client.events.clear();

    for (const file of eventsFiles) {
        const filePath = path.join(eventsPath, file);
        const event = require(filePath);
        table.addRow(event.name, '🟩');

        if (event.once) 
            client.once(event.name, (...args) => event.execute(...args));
        else
            client.on(event.name, (...args) => event.execute(...args));
    }
    return console.log(table.toString(), '\nLoaded Event(s).')
}

module.exports = { loadEvents }