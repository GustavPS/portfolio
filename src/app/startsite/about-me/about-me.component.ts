import { Component, OnInit } from '@angular/core';
import {WebSocketService} from '../../services/WebSocket/web-socket.service';

@Component({
  selector: 'about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.css']
})
export class AboutMeComponent implements OnInit {

  constructor(private webSocket: WebSocketService) { }

  ngOnInit() {
    this.webSocket.requestAboutMe();
  }

}
