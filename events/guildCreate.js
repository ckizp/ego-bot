const { Events } = require('discord.js');
const { JSON_Guilds } = require('../JSON_Object');
const obj = new JSON_Guilds('./guilds.json')

module.exports = {
    name: Events.GuildCreate,
    async execute(guild) {
        obj.addGuild(guild.id, true);
    }
}