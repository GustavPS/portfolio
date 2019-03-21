import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import {Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private url: string = "192.168.0.105:3000";
  private socket;

  constructor() { }

  connect(): void {
    this.socket = io(this.url);
  }

  requestAboutMe(): void {
    this.socket.emit("request-about-me");
  }
  requestResourceLinks(): void {
    this.socket.emit("request-resource-links");
  }
  requestProjects(count: number): void {
    this.socket.emit("request-projects", count);
  }

  getAboutMe(): Observable<JSON> {
    return Observable.create((observer) => {
      this.socket.on('about-me', (data) => {
        console.log("Got data");
        observer.next(JSON.parse(data));
      });
    });
  }
  getResourceLinks(): Observable<Array<JSON>> {
    return Observable.create((observer) => {
      this.socket.on('resource-links', (data) => {
        observer.next(data);
      });
    });
  }
  getProjects(): Observable<Array<JSON>> {
    return Observable.create((observer) => {
      this.socket.on('projects', (data) => {
        observer.next(data);
      });
    });
  }
}
