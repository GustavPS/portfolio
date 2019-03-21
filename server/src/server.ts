import {SqlHandler} from './SqlHandler';
import {GitHubHandler} from './GitHubHandler';
import {Logger} from './Logger';

const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

export class Server {
  private readonly port: number;
  private gitHubHandler: GitHubHandler;

  constructor(port: number) {
    this.gitHubHandler = new GitHubHandler();
    this.port = port;
  }

  private setupSocket(): void {
    io.on('connection', (socket: any) => {
      Logger.Debug("New connection")

      socket.on("request-about-me", () => {
        Logger.Debug("Socket: request-about-me");
        SqlHandler.getConnection((connection) => {
          connection.query("SELECT * FROM AboutMe", (err, result) => {
            if(err) throw err;

            socket.emit("about-me", JSON.stringify(result[0]));
            connection.release();
          });
        });
      });

      socket.on("request-resource-links", () => {
        Logger.Debug("Socket: request-resource-links");
        SqlHandler.getConnection((connection) => {
          connection.query("SELECT name, link, icon FROM Resources", (err, result) => {
            if(err) throw err;

            socket.emit("resource-links", result);
            connection.release();
          });
        });
      });

      socket.on("request-projects", (count: number) => {
        SqlHandler.getConnection((connection) => {
          connection.query("SELECT * FROM Projects LIMIT ?", [count], (err, result) => {
            if(err) throw err;

            socket.emit("projects", result);
            connection.release();
          });
        });
      });
    });

  }

  public startServer(): void {
    this.updateProjects();
    this.setupSocket();
    http.listen(this.port, () => {
      Logger.General("listening on *:3000");
    });
  }

  private updateProjects(): void {
    this.gitHubHandler.updateRepoDatabase();
  }
}
