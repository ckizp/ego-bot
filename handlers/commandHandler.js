const fs = require('fs');
const path = require('path');

async function loadCommands(client) {
    const commandsPath = path.join(__dirname, '../commands');
    const commandsFiles = fs.readdirSync(commandsPath).filter((file) => file.endsWith('.js'));
    await client.commands.clear();
    let commandsArray = [];

    for (const file of commandsFiles) {
        const filePath = path.join(commandsPath, file);
        const command = require(filePath);

        client.commands.set(command.data.name, command);
        commandsArray.push(command.data.toJSON())
    }
    client.application.commands.set(commandsArray);
}

module.exports = { loadCommands };