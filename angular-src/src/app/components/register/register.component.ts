import { Component, OnInit } from '@angular/core';
import { ValidateService } from'../../services/validate.service'
import {FlashMessagesService} from 'angular2-flash-messages'
import { AuthService } from 'src/app/services/auth.service';
import {Router} from '@angular/router'
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
name:string;
username:string;
email:string;
password:string;
  constructor(private validateService:ValidateService,
    private FlashMessageService: FlashMessagesService,
    private authService: AuthService,
    private router: Router,
    ) { }

  ngOnInit(): void {
  }
  onRegisterSubmit()
  {
    const user={
      name:this.name,
      password:this.password,
      email:this.email,
      username:this.username
    }
    if(!this.validateService.validateregister(user))
    {
      this.FlashMessageService.show('Please Fill All fields', { cssClass: 'alert-danger', timeout: 3000 });
      return false;
    }
    if(!this.validateService.validateEmail(user.email))
    {
      this.FlashMessageService.show('Please Fill in with a valid email', { cssClass: 'alert-danger', timeout: 3000 });
      return false;
    }
    this.authService.Register(user).subscribe(data=>{
      debugger;
if(data["success"])
{
  this.FlashMessageService.show("Congrats, You've registered Succesfully", { cssClass: 'alert-success', timeout: 3000 });
this.router.navigate(['/login'])
 }
else
{
  this.FlashMessageService.show("Sorry, Something went Wrong", { cssClass: 'alert-danger', timeout: 3000 });
}
    });
    

  }
}
