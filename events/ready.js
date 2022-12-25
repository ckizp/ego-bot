const { Events } = require('discord.js');
const { JSON_Guilds } = require("../JSON_Object");
const obj = new JSON_Guilds("./guilds.json");
const { loadCommands } = require('../handlers/commandHandler')
const guild_model = require('../models/guild');

module.exports = {
    name: Events.ClientReady,
    once: true,
    execute(client) {
        client.guilds.cache.map((guild) => obj.addGuild(guild.id, false));
        obj.writeJSON();

        client.guilds.cache.map((guild) => {
            guild_model.findOne({id: guild.id}, async (err, data) => {
                if (!data) {
                    await guild_model.create({
                        id: guild.id
                    })
                }
            })
        });

        loadCommands(client);
    }
}