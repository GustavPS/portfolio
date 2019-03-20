import { Component, OnInit } from '@angular/core';
import {WebSocketService} from '../../services/WebSocket/web-socket.service';

@Component({
  selector: 'about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.css']
})
export class AboutMeComponent implements OnInit {
  public aboutMeTitle: string;
  public aboutMeText: string;

  constructor(private webSocket: WebSocketService) { }

  ngOnInit() {
    this.webSocket.requestAboutMe();
    this.webSocket.getAboutMe()
      .subscribe(data => {
        this.aboutMeTitle = data['title'];
        this.aboutMeText  = data['content'];
      });
  }

}
