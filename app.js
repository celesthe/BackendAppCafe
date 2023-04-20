require('dotenv').config();

const Server = require('./models/server');

const server = new Server();
const serverListener = server.listen();

module.exports = {server, serverListener};