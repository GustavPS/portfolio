import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';


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
}
