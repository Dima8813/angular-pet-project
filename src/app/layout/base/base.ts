import { Component } from '@angular/core';
import { Footer, Navbar, Sidebar } from '@layout';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-base',
  imports: [
    Sidebar,
    Navbar,
    RouterOutlet,
    Footer
  ],
  standalone: true,
  templateUrl: './base.html',
  styleUrl: './base.scss',
})
export class Base {

}
