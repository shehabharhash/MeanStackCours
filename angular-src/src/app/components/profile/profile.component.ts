import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
user:object;
  constructor(private auth:AuthService,
    private router:Router) { }

  ngOnInit(): void {
    this.auth.getProfile().subscribe(profile=>{
      console.log(profile)
      this.user=profile["user"];

    },err=>{
      
      return false;
    })
  }

}
