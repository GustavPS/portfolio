import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import {Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private url: string = "localhost:3000";
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

  getAboutMe(): Observable<JSON> {
    return Observable.create((observer) => {
      this.socket.on('about-me', (data) => {
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
}
