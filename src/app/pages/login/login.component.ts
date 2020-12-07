import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../services/user.service';
import {Router} from '@angular/router';
import {MerchantService} from '../../services/merchant.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  merchantloginForm: FormGroup;
  userEmailTaken: boolean;
  merchantEmailTaken: boolean;

  constructor(private fb: FormBuilder, private router: Router, private userService: UserService, private merchantService: MerchantService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      password: ['', [Validators.required]]
    });
    this.merchantloginForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      password: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  get memail() {
    return this.merchantloginForm.get('email');
  }

  get mpassword() {
    return this.merchantloginForm.get('password');
  }

  onSubmit() {
    console.log('in onsubmit');
    if (!this.loginForm.valid) {
      return false;
    } else {
      this.userService.loginUser(this.loginForm.value).subscribe(
        (res) => {
          localStorage.setItem('usertoken', res.usertoken);
          localStorage.setItem('user', res.userid);
          console.log(res);
          console.log('User logged in successfully!');
          this.router.navigateByUrl('/homepage').then(r => (r));
          // this.ngZone.run(() => this.router.navigateByUrl('/homepage'));
        }, (error) => {
          console.log(error);
        });
    }
  }

  merchantSubmit() {
    console.log('in merchantsubmit');
    if (!this.merchantloginForm.valid) {
      return false;
    } else {
      this.merchantService.loginmerchant(this.merchantloginForm.value).subscribe(
        (res) => {
          localStorage.setItem('merchanttoken', res.merchanttoken);
          localStorage.setItem('merchant', res.merchantid);
          console.log(res);
          console.log('Merchant logged in successfully!');
          this.router.navigateByUrl('/merchant/homepage').then(r => (r));
          // this.ngZone.run(() => this.router.navigateByUrl('/homepage'));
        }, (error) => {
          console.log(error);
        });
    }
  }

  userEmailUnique() {
    this.userEmailTaken = true;
    this.userService.checkEmailNotTaken(this.loginForm.controls.email.value).subscribe(res => {
      if (res.taken) {
        this.userEmailTaken = true;
      } else {
        this.userEmailTaken = false;
      }
    });
  }

  merchantEmailUnique() {
    this.merchantEmailTaken = false;
    this.merchantService.checkEmailNotTaken(this.merchantloginForm.controls.email.value).subscribe(res => {
      if (res.taken) {
        this.merchantEmailTaken = true;
      } else {
        this.merchantEmailTaken = false;
      }
    });
  }
}
