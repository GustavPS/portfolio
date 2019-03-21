import {Logger} from './Logger';
import {GitHubHandler} from './GitHubHandler';

export class Command {
  private readonly stdin;
  private readonly commands: any;
  private readonly gitHubHandler: GitHubHandler;


  constructor() {
    this.stdin = process.openStdin();
    this.gitHubHandler = new GitHubHandler();
    this.commands = [
      {
        name: "updateProjects",
        description: "Get the latest projects information from Git",
        function: this.updateProjects
      },
      {
        name: "help",
        description: "Show all commands",
        function: this.help
      }
    ];
  }

  private trim(d): string {
    return d.toString().trim();
  }

  private updateProjects(t: Command): void {
    t.gitHubHandler.updateRepoDatabase();
  }

  private help(t: Command): void {
    Logger.General("Commands:");
    for(let command of t.commands) {
      Logger.General(`-- '${command.name}': ${command.description}`);
    }
  }

  public listen(): void {
    this.stdin.addListener("data", (c) => {
      let found: boolean = false;
      c = this.trim(c);
      for(let command of this.commands) {
        if(c === command.name) {
          command.function(this);
          found = true;
          break;
        }
      }
      if(!found) {
        Logger.General("Write 'help' to show all commands.");
      }
    });
  }
}
