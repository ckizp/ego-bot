const { Events, Guild } = require('discord.js');
const { JSON_Guilds } = require('../JSON_Object');
const obj = new JSON_Guilds('./guilds.json');
const guild_model = require('../models/guild');

module.exports = {
    name: Events.GuildCreate,
    /**
     * @param {Guild} guild 
     */
    async execute(guild) {
        obj.addGuild(guild.id, true);
        await guild_model.findOne({id: guild.id}, async (err, data) => {
            if (!data) {
                await guild_model.create({
                    id: guild.id
                })
            }
        });
    }
}