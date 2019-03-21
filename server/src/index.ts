import {Server} from './server';
import {Command} from './Command';

let server: Server = new Server(3000);
let command: Command = new Command();

server.startServer();
command.listen();
