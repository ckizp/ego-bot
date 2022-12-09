const { WelcomeChannel } = require('discord.js');
const fs = require('fs');

class JSON_Config {
    constructor(name) {
        this.name = name;
        this.file = JSON.parse(fs.readFileSync(name));
    }

    addServer(server_id) {
        let isNewServer = new Boolean(true);
        this.file.servers.forEach((array) => {
            if (array.id === server_id)
                isNewServer = false;
        });
        if (isNewServer) {
            this.file.servers.push({
                id: server_id,
                welcomeBackgroundURL: "default.png",
                welcomeChannelID: null
            });
            fs.writeFileSync(this.name, JSON.stringify(this.file, null, 3));
        }
    }

    insert(obj) {
        let haveToWrite = new Boolean(false);
        this.file.servers.forEach((server) => {
            if (server !== Object.assign(server, obj)) {
                Object.assign(server, obj)
                if (!haveToWrite) haveToWrite = true;
            }
        })
        if (haveToWrite) 
            fs.writeFileSync(this.name, JSON.stringify(this.file, null, 3));
    }

    deleteProperty(key) {
        let haveToWrite = new Boolean(false);
        this.file.servers.forEach((server) => {
            delete server[key];
        })
        if (haveToWrite) 
            fs.writeFileSync(this.name, JSON.stringify(this.file, null, 3));
    }

    alter(server_id, key, newValue) {
        if (this.file.servers[this.getServerIndexWithID(server_id)][key] !== newValue) {
            this.file.servers[this.getServerIndexWithID(server_id)][key] = newValue;
            fs.writeFileSync(this.name, JSON.stringify(this.file, null, 3));
        }
    }

    getToken() {
        return this.file.token;
    }

    getPropertyValue(server_id, key) {
        return this.file.servers[this.getServerIndexWithID(server_id)][key];
    }

    getServerIndexWithID(server_id) {
        return this.file.servers.findIndex((server) => server.id === server_id);
    }
}

const obj = new JSON_Config("config.json");

obj.alter("647800671218958336", "welcomeChannelID", "test");

module.exports.JSON_Config = JSON_Config;