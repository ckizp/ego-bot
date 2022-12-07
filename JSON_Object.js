const fs = require('fs');

class JSON_Config {
    constructor(name) {
        this.name = name;
        this.file = JSON.parse(fs.readFileSync(name));
    }

    addServer(server) {
        if (!this.file.servers.forEach((array) => {
            if (array.id == server.id)
                return true;
        })) {
            this.file.servers.push(server.serv);
            fs.writeFileSync(this.name, JSON.stringify(this.file, null, 3));
        }
    }

    updateServer(serv, welcomeBackgroundURL) {
        let index = this.file.servers.findIndex(server => server.id = serv.id);
        this.file.servers[index].welcomeBackgroundURL = welcomeBackgroundURL;
        fs.writeFileSync(this.name, JSON.stringify(this.file, null, 3));
    }
}

class Server {
    constructor(server_id) {
        this.serv = {
            id : server_id,
            welcomeBackgroundURL: "blue-lock.png"
        }
    }
}

const obj = new JSON_Config("config.json");

const serv = new Server("647800671218958336");
obj.addServer(serv);

obj.updateServer(serv, "bluck-lock2.png");



/*fs.readFile('config.json', (err, data) => {
    let obj = JSON.parse(data);

    obj.servers.push({
        name: "test",
        desc: "test"
    });

    let json = JSON.stringify(obj, null, 3);

    fs.writeFile('config.json', json, (err_) => {});
});*/