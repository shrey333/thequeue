import {Component, NgZone, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {UserService} from '../../services/user.service';
import {User} from '../../model/user.model';

@Component({
  selector: 'app-useredit',
  templateUrl: './useredit.component.html',
  styleUrls: ['./useredit.component.css']
})
export class UsereditComponent implements OnInit {
  userForm: FormGroup;
  currentUser: User;
  id: any;

  constructor(private fb: FormBuilder, private router: Router, private ngZone: NgZone, private userService: UserService) {
    this.id = localStorage.getItem('user');
    console.log('userid:' + this.id);
    console.log('Hello World');
    this.userForm = this.fb.group({
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      dateofbirth: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      password: ['', [Validators.required]],
      mobilenumber: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      address1: ['', [Validators.required]],
      address2: ['', [Validators.required]],
      city: ['', [Validators.required]],
      state: ['', [Validators.required]],
      pincode: ['', [Validators.required]]
    });
    this.userService.getUser(this.id).subscribe(data => {
      this.userForm.setValue({
        firstname: data.firstname,
        lastname: data.lastname,
        dateofbirth: data.dateofbirth,
        email: data.email,
        password: data.password,
        mobilenumber: data.mobilenumber,
        address1: data.address1,
        address2: data.address2,
        city: data.city,
        state: data.state,
        pincode: data.pincode
      });
    });
    // console.log(this.currentUser);
  }

  ngOnInit(): void {
  }

  onSubmit() {
    console.log('Going to update something');
    if (!this.userForm.valid) {
      return false;
    } else {
      this.userService.updateUser(this.id, this.userForm.value).subscribe(
        (res) => {
          console.log('User successfully updated!');
        }, (error) => {
          console.log(error);
        });
    }
  }

  onDelete() {
    console.log('Going to delete something');
    if (window.confirm('Are you sure?')) {
      this.userService.deleteUser(this.id).subscribe((data) => {
          localStorage.removeItem('usertoken');
          localStorage.removeItem('user');
          this.router.navigateByUrl('/index');
        }
      );
    }
  }
}
