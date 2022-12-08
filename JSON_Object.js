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
                welcomeBackgroundURL: "default.png"
            });
            fs.writeFileSync(this.name, JSON.stringify(this.file, null, 3));
        }
    }

    insertAttribute(obj) {
        this.file.servers.forEach((server) => {
            Object.assign(server, obj);
        })
        console.log(obj);
        fs.writeFileSync(this.name, JSON.stringify(this.file, null, 3));
    }
}

module.exports.JSON_Config = JSON_Config;