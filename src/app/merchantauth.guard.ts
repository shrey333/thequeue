import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {MerchantService} from './services/merchant.service';


@Injectable({
  providedIn: 'root'
})
export class MerchantauthGuard implements CanActivate {

  constructor(private merchantService: MerchantService, private router: Router) {
  }

  canActivate(): boolean{
    if (this.merchantService.isLoggedIn()){
      return true;
    }
    else{
      this.router.navigateByUrl('/login').then(r => console.log(r));
    }
  }

}
