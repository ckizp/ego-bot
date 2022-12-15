async function loadCommands(client) {
    const fs = require('fs');
    const path = require('path');
    const ascii = require('ascii-table');
    const table = new ascii().setHeading('Type', 'Commands', 'Status');

    const commandsPath = path.join(__dirname, '../commands');
    const commandsFolders = fs.readdirSync(commandsPath);

    await client.commands.clear();
    let commandsArray = [];

    for (const folder of commandsFolders) {
        const folderPath = path.join(__dirname, '../commands/' + folder);
        const commandsFiles = fs.readdirSync(folderPath).filter((file) => file.endsWith('.js'));

        for (const file of commandsFiles) {
            const filePath = path.join(folderPath, file);
            const command = require(filePath);
            table.addRow(folder, command.data.name, '🟩');

            client.commands.set(command.data.name, command);
            commandsArray.push(command.data.toJSON())
        }
    }

    client.application.commands.set(commandsArray);
    return console.log(table.toString(), '\nLoaded Command(s).');
}

module.exports = { loadCommands };















/*async function loadCommands(client) {
    const fs = require('fs');
    const path = require('path');
    const ascii = require('ascii-table');
    const table = new ascii().setHeading('Commands', 'Status');

    const commandsPath = path.join(__dirname, '../commands');
    const commandsFiles = fs.readdirSync(commandsPath).filter((file) => file.endsWith('.js'));
    await client.commands.clear();
    let commandsArray = [];

    for (const file of commandsFiles) {
        const filePath = path.join(commandsPath, file);
        const command = require(filePath);
        table.addRow(command.data.name, '🟩');

        client.commands.set(command.data.name, command);
        commandsArray.push(command.data.toJSON())
    }
    client.application.commands.set(commandsArray);
    return console.log(table.toString(), '\nLoaded Command(s).');
}

module.exports = { loadCommands };*/