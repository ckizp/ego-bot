const { Events } = require("discord.js");

module.exports {
    name: Events.ClientReady,
    once: true,
    execute(client) {
        client.guilds.cache.map((guild) => obj.addGuild(guild.id, false));
        obj.writeJSON();
    }
}