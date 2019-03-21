import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Gustavs portfolio';
  nav_open: boolean = false;

  toggleNav(): void {
    this.nav_open = !this.nav_open;
  }
}
