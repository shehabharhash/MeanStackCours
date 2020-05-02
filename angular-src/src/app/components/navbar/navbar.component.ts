import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private auth:AuthService,
    private flashMessageService:FlashMessagesService,
    private router:Router) {
      
     }

  ngOnInit(): void {
  }
  onLogout()
  {
this.auth.logout();
this.flashMessageService.show("You're Logged Out", { cssClass: 'alert-warning', timeout: 5000 });
this.router.navigate(["/login"]);
return false;
  }

}
