import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
 
@Component({
  selector: 'app-nav-auth',
  standalone: true,
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './nav-auth.component.html',
  styleUrl: './nav-auth.component.scss'
})
export class NavAuthComponent {

}
