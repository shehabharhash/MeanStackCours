import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {JwtHelperService} from '@auth0/angular-jwt'
@Injectable({
  providedIn: 'root'
})
export class AuthService {
authToken:any;
user:any;

  constructor(private http:HttpClient,private helper:JwtHelperService ) { }
  Register(user)
  {
    let headers=new HttpHeaders();
    headers.append('Content-Type','application/json');
    return this.http.post(environment.Uri+'/user/register',user,{headers:headers});
    
  }
  Authenticate(user)
  {
    let headers=new HttpHeaders();
    headers.append('Content-Type','application/json');
    return this.http.post(environment.Uri+'/user/authenticate',user,{headers:headers});
  }
  getProfile()
  {
    this.loadToken();
    let headers=new HttpHeaders();
    headers.append('Content-Type','application/json');
    
    headers.append('Authorization',`Bearer ${this.authToken}`);
    console.log(headers)
    return this.http.get(environment.Uri+'/user/profile',{headers:headers});
  }
  storeUserData(token,user)
  {
    console.log(token)
    localStorage.setItem("id token",token);
    localStorage.setItem("user",JSON.stringify(user));
    this.authToken=token;
    this.user=user;
  }
  logout()
  {
    this.authToken=null;
    this.user=null;
    localStorage.clear();
  }
  loadToken()
  {
    const token=localStorage.getItem("id token");
    this.authToken=token;
    console.log("From Token"+this.authToken)
   
  }
  loggedIn()
  {
 
      console.log(localStorage.getItem("id token") != null && !this.helper.isTokenExpired(localStorage.getItem("id token")))
      return localStorage.getItem("id token") != null && !this.helper.isTokenExpired(localStorage.getItem("id token"));

   
    
  }
}
