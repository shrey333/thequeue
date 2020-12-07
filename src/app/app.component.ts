import { Component } from '@angular/core';
import { UserService } from './services/user.service';
import {MerchantService} from './services/merchant.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'why';

  constructor(public userService: UserService, public  merchantService: MerchantService) {
  }
}
