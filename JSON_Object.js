const fs = require('fs');

class JSON_Guilds {
    constructor(name) {
        this.name = name;
        this.file = JSON.parse(fs.readFileSync(name));
    }

    addGuild(guild_id, haveToWrite = true) {
        let isNewGuild = new Boolean(true);
        this.file.guilds.forEach((array) => {
            if (array.id === guild_id)
                isNewGuild = false;
        });
        if (isNewGuild) {
            this.file.guilds.push({
                id: guild_id,
                welcomeChannelID: null,
                tempbanlist: []
            });
            if (haveToWrite)
            this.writeJSON();
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
            this.writeJSON();
    }

    deleteProperty(key) {
        this.file.guilds.forEach((guild) => {
            delete guild[key];
        })
        this.writeJSON();
    }

    alter(guild_id, key, newValue) {
        if (this.file.guilds[this.getGuildIndexWithID(guild_id)][key] !== newValue) {
            this.file.guilds[this.getGuildIndexWithID(guild_id)][key] = newValue;
            this.writeJSON();
        }
    }

    getPropertyValue(guild_id, key) {
        return this.file.guilds[this.getGuildIndexWithID(guild_id)][key];
    }

    getGuildIndexWithID(guild_id) {
        return this.file.guilds.findIndex((guild) => guild.id === guild_id);
    }

    writeJSON() {
        fs.writeFileSync(this.name, JSON.stringify(this.file, null, 3));
    }

    addTempban(guild_id, member_id, start_time, end_time) {
        this.file.guilds[this.getGuildIndexWithID(guild_id)].tempbanlist.push({
            member_id: member_id,
            start_time: start_time,
            end_time: end_time
        });
        this.writeJSON();
    }
}

module.exports.JSON_Guilds = JSON_Guilds;