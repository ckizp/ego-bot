const fs = require('fs');

class JSON_Object {
    constructor(name) {
        this.name = name;
        this.file = ((typeof(file) !== undefined) ? (fs.readFileSync(name)) : `
        {
            token : "MTA0NTQxNDE4NTg3OTc1MjgwNA.GaVd8S.-HYlppZKrRgQiklZ5Iw3I7xQdaj5PXx58-vo_U",
            servers : [

            ]
        }
        `);
    }

    newServer(id) {
        this.file.servers.push({
            serverId: `${id}`,
            welcomeBackgroundURL : null
        })
    }

    updateServer(id, options = {welcomeBackgroundURL}) {
        let index = this.file.findIndex(server => server.id = id);
        this.file.servers[index].welcomeBackgroundURL = welcomeBackgroundURL;
        fs.writeFile(this.name, JSON.stringify(file, null, 3)); 
    }
}

/*class Server extends JSON_Object {
    constructor(id) {
        this.id = id;
    }

    updateServer(options = {welcomeBackgroundURL}) {
        let index = this.file.findIndex(server => server.id = this.id);
        this.file.servers[index].welcomeBackgroundURL = welcomeBackgroundURL;
        fs.writeFile(this.name, JSON.stringify(file, null, 3)); 
    }
}*/

const obj = new JSON_Object("config.json");

obj.updateServer("740468305655103580", {welcomeBackgroundURL: "blue-lock.png"})



/*fs.readFile('config.json', (err, data) => {
    let obj = JSON.parse(data);

    obj.servers.push({
        name: "test",
        desc: "test"
    });

    let json = JSON.stringify(obj, null, 3);

    fs.writeFile('config.json', json, (err_) => {});
});*/