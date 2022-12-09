const { WelcomeChannel } = require('discord.js');
const fs = require('fs');

class JSON_Guilds {
    constructor(name) {
        this.name = name;
        this.file = JSON.parse(fs.readFileSync(name));
    }

    addGuild(guild_id) {
        let isNewGuild = new Boolean(true);
        this.file.guilds.forEach((array) => {
            if (array.id === guild_id)
                isNewGuild = false;
        });
        if (isNewGuild) {
            this.file.guilds.push({
                id: guild_id,
                welcomeChannelID: null
            });
            fs.writeFileSync(this.name, JSON.stringify(this.file, null, 3));
        }
    }

    insert(obj) {
        let haveToWrite = new Boolean(false);
        this.file.guilds.forEach((guild) => {
            if (guild !== Object.assign(guild, obj)) {
                Object.assign(guild, obj)
                if (!haveToWrite) haveToWrite = true;
            }
        })
        if (haveToWrite) 
            fs.writeFileSync(this.name, JSON.stringify(this.file, null, 3));
    }

    deleteProperty(key) {
        let haveToWrite = new Boolean(false);
        this.file.guilds.forEach((guild) => {
            delete guild[key];
        })
        if (haveToWrite) 
            fs.writeFileSync(this.name, JSON.stringify(this.file, null, 3));
    }

    alter(guild_id, key, newValue) {
        if (this.file.guilds[this.getServerIndexWithID(guild_id)][key] !== newValue) {
            this.file.guilds[this.getServerIndexWithID(guild_id)][key] = newValue;
            fs.writeFileSync(this.name, JSON.stringify(this.file, null, 3));
        }
    }

    getPropertyValue(guild_id, key) {
        return this.file.guilds[this.getServerIndexWithID(guild_id)][key];
    }

    getServerIndexWithID(guild_id) {
        return this.file.guilds.findIndex((guild) => guild.id === guild_id);
    }
}

module.exports.JSON_Guilds = JSON_Guilds;