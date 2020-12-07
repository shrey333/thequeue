import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import {UserService} from './services/user.service';
import {MerchantService} from './services/merchant.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private merchantService: MerchantService, private userService: UserService, private router: Router) {
  }

  canActivate(): boolean{
    if (this.userService.isLoggedIn()){
      return true;
    }
    else{
      this.router.navigateByUrl('/login').then(r => console.log(r));
    }
  }
}
