import {Router} from '@angular/router';
import {UserService} from '../../services/user.service';
import {Component, NgZone, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  userForm: FormGroup;
  emailTaken: boolean = true;

  constructor(private fb: FormBuilder, private router: Router, private ngZone: NgZone, private userService: UserService) {
    console.log('Hello World');
    this.userForm = this.fb.group({
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      dateofbirth: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      password: ['', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]],
      mobilenumber: ['', [Validators.required, Validators.pattern('^(\\+\\d{1,3}[- ]?)?\\d{10}$')]],
      address1: ['', [Validators.required]],
      address2: ['', [Validators.required]],
      city: ['', [Validators.required]],
      state: ['', [Validators.required]],
      pincode: ['', [Validators.required, Validators.pattern('^[1-9][0-9]{5}$')]]
    });
  }

  ngOnInit(): void {

  }

  get firstname() {
    return this.userForm.get('firstname');
  }

  get lastname() {
    return this.userForm.get('lastname');
  }

  get dateofbirth() {
    return this.userForm.get('dateofbirth');
  }

  get email() {
    return this.userForm.get('email');
  }

  get password() {
    return this.userForm.get('password');
  }

  get mobilenumber() {
    return this.userForm.get('mobilenumber');
  }

  get address1() {
    return this.userForm.get('address1');
  }

  get address2() {
    return this.userForm.get('address2');
  }

  get city() {
    return this.userForm.get('city');
  }

  get state() {
    return this.userForm.get('state');
  }

  get pincode() {
    return this.userForm.get('pincode');
  }

  onSubmit() {
    console.log('in onsubmit');
    if (!this.userForm.valid) {
      return false;
    } else {
      this.userService.createUser(this.userForm.value).subscribe(
        (res) => {
          localStorage.setItem('usertoken', res.usertoken);
          localStorage.setItem('user', res.userid);
          console.log(res);
          console.log('User successfully created!');
          this.router.navigateByUrl('/homepage').then(r => console.log(r));
          // this.ngZone.run(() => this.router.navigateByUrl('/homepage'));
        }, (error) => {
          console.log(error);
        });
    }
  }

  emailUnique(){
    this.emailTaken = false;
    this.userService.checkEmailNotTaken(this.userForm.controls['email'].value).subscribe(res => {
      if (res.taken) {
        this.emailTaken = true;
      }
      else{
        this.emailTaken = false;
      }
    });
    console.log('email taken? ' + this.emailTaken);
  }

}
