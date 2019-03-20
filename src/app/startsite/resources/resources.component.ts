import { Component, OnInit } from '@angular/core';
import {WebSocketService} from '../../services/WebSocket/web-socket.service';

@Component({
  selector: 'resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.css']
})
export class ResourcesComponent implements OnInit {
  public resources: Array<JSON>;

  constructor(private webSocket: WebSocketService) { }

  ngOnInit() {
    this.webSocket.requestResourceLinks();
    this.webSocket.getResourceLinks()
      .subscribe(data => {
        this.resources = data;
      });
  }

}
