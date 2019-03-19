import { Component, OnInit } from '@angular/core';
import {WebSocketService} from '../../services/WebSocket/web-socket.service';

@Component({
  selector: 'app-startsite-main',
  templateUrl: './startsite-main.component.html',
  styleUrls: ['./startsite-main.component.css']
})
export class StartsiteMainComponent implements OnInit {

  constructor(private webSocket: WebSocketService) { }

  ngOnInit() {
    this.webSocket.connect();
  }

}
