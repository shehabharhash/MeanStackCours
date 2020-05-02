import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidateService {

  constructor() { }
  validateregister(user)
  {
   
    if(user.name==undefined||user.email==undefined||user.password==undefined||user.username==undefined)
    {return false;}
    return true;
  }
  validateEmail(email)
  {
      var re =RegExp('^.+@[^\.].*\.[a-z]{2,}$');
      var test= re.test(email);
      debugger;
      return test;
  }
}
