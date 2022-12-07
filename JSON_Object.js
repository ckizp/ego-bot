const fs = require('fs');

class JSON_Config {
  constructor(name) {
    this.name = name;
    this.file = JSON.parse(fs.readFileSync(name));
  }

  addServer(serv) {
    let isNewServer = new Boolean(true);
    this.file.servers.forEach((array) => {
      isNewServer = (array.id === serv.id) ? (false) : (true)
    })
    if (isNewServer) {
      this.file.servers.push({
        id: serv.id,
        welcomeBackgroundURL: "default.png"
      });
      fs.writeFileSync(this.name, JSON.stringify(this.file, null, 3));
    }
  }
}

class Server {
  constructor(id) {
    this.id = id;
  }
}

const obj = new JSON_Config("config.json");
const serv = new Server("647800671218958336");
obj.addServer(serv);

/*  addServer(server) {
    var isNewServer = true;
    this.file.servers.includes((obj) => {
      if (obj.id = server.id)
        isNewServer = false;
    })
    if (isNewServer) {
      this.file.servers.push(server.getServer());
      fs.writeFileSync(this.name, JSON.stringify(this.file, null, 3));
    }
  }

  updateServer(serv, bgURL) {
    let index = this.file.servers.findIndex(server => server.id = serv.id);
    //this.file.servers[index].welcomeBackgroundURL
    console.log(this.file)
    fs.writeFileSync(this.name, JSON.stringify(this.file, null, 3));
  }*/
