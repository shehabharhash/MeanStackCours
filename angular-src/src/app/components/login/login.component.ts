import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'
import { AuthService } from 'src/app/services/auth.service';
import {FlashMessagesService} from 'angular2-flash-messages'
import { from } from 'rxjs';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
username:string;
password:string;
  constructor(private auth:AuthService,
    private flashMessageService:FlashMessagesService,
    private router:Router) { }

  ngOnInit(): void {
  }
  onLoginSubmit()
  {
const user={
  username:this.username,
  password:this.password
}
this.auth.Authenticate(user).subscribe(data=>{
  console.log(data);
 
  if(data["success"]=="true")
{
 
  this.flashMessageService.show("Hello,"+data["user"].name, { cssClass: 'alert-success', timeout: 3000 });
  this.auth.storeUserData(data["token"],data["user"])
  this.router.navigate(['/dashboard'])
 }
 else
 {
 this.flashMessageService.show(data["msg"], { cssClass: 'alert-danger', timeout: 5000 });
 this.router.navigate(['/login'])
 }
})

  }
}
