const { Events } = require('discord.js');
const { JSON_Guilds } = require("../JSON_Object");
const obj = new JSON_Guilds("./guilds.json");
const { loadCommands } = require('../handlers/commandHandler')

module.exports = {
    name: Events.ClientReady,
    once: true,
    execute(client) {
        client.guilds.cache.map((guild) => obj.addGuild(guild.id, false));
        obj.writeJSON();
        loadCommands(client);
    }
}