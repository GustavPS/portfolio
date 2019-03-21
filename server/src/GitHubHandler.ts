import {SqlHandler} from './SqlHandler';
import {Logger} from './Logger';

const https = require('https');

export class GitHubHandler {
  private readonly username: string;
  private readonly oAuth: string;
  private readonly host: string;
  private readonly headers: {};

  constructor() {
    this.username = "gustavps";
    this.oAuth = "b66909f1867210555df9baf62393af70cdac57fb";
    this.host = "api.github.com";
    this.headers = { 'User-Agent': 'Mozilla/5.0' };
  }

  private HttpRequest(path: string, flags: [string], callback: (response) => void): void {
    let options = {
      hostname: this.host,
      path: path  + "?access_token=" + this.oAuth,
      headers: this.headers
    };
    for(let flag of flags) {
      options["path"] += "&" + flag;
    }

    https.get(options, (res) => {
      let body = '';
      res.on('data', (chunk) => {
        body += chunk;
      });
      res.on('end', () => {
        callback(JSON.parse(body));
      });
    });
  }

  private getRepos(callback: (response) => void): void {
    this.HttpRequest('/user/repos', [null],(response) => {
      callback(response);
    });
  }

  private getReadme(repo: string, callback: (response) => void): void {
    this.HttpRequest(`/repos/${this.username}/${repo}/readme`, ["affiliation=owner"],  (response) => {
      if(response["message"] === "Not Found") {
        callback("");
      }
      else {
        callback(Buffer.from(response["content"], 'base64').toString());
      }
    });
  }

  public updateRepoDatabase(): void {
    Logger.Debug("Updating GitHub repos...");
    this.getRepos((repos) => {
      SqlHandler.getConnection((connection) => {
        for(let repo of repos) {
          this.getReadme(repo["name"], (readme) => {
            connection.query
            (
              "INSERT INTO Projects (title, original_content, custom_content, link, type)" +
              "VALUES (?,?,?,?,?) ON DUPLICATE KEY UPDATE original_content=?",
              [repo["name"], readme, readme, repo["html_url"], "GitHub", readme]
            );
          });
        }
        Logger.Debug("Done updating GitHub repos.");
        connection.release();
      });
    });
  }
}
