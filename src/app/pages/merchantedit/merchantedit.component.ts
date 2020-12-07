import {Component, NgZone, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Merchant} from '../../model/merchant.model';
import {Router} from '@angular/router';
import {MerchantService} from '../../services/merchant.service';

@Component({
  selector: 'app-merchantedit',
  templateUrl: './merchantedit.component.html',
  styleUrls: ['./merchantedit.component.css']
})
export class MerchanteditComponent implements OnInit {
  merchantForm: FormGroup;
  currentmerchant: Merchant;
  id: any;

  constructor(private fb: FormBuilder, private router: Router, private ngZone: NgZone, private merchantService: MerchantService) {
    this.id = localStorage.getItem('merchant');
    console.log('merchantid:' + this.id);
    console.log('Hello World');
    this.merchantForm = this.fb.group({
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      shopname: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      password: ['', [Validators.required]],
      mobilenumber: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      address1: ['', [Validators.required]],
      address2: ['', [Validators.required]],
      city: ['', [Validators.required]],
      state: ['', [Validators.required]],
      pincode: ['this.currentmerchant.pincode', [Validators.required]]
    });
    this.merchantService.getmerchant(this.id).subscribe(data => {
      this.merchantForm.setValue({
        firstname: data.firstname,
        lastname: data.lastname,
        shopname: data.shopname,
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
    // console.log(this.currentmerchant);
  }

  get firstname() {
    return this.merchantForm.get('firstname');
  }

  get lastname() {
    return this.merchantForm.get('lastname');
  }

  get shopname() {
    return this.merchantForm.get('dateofbirth');
  }

  get email() {
    return this.merchantForm.get('email');
  }

  get password() {
    return this.merchantForm.get('password');
  }

  get mobilenumber() {
    return this.merchantForm.get('mobilenumber');
  }

  get address1() {
    return this.merchantForm.get('address1');
  }

  get address2() {
    return this.merchantForm.get('address2');
  }

  get city() {
    return this.merchantForm.get('city');
  }

  get state() {
    return this.merchantForm.get('state');
  }

  get pincode() {
    return this.merchantForm.get('pincode');
  }

  ngOnInit(): void {
  }

  onSubmit() {
    console.log('Going to update something');
    if (!this.merchantForm.valid) {
      return false;
    } else {
      this.merchantService.updatemerchant(this.id, this.merchantForm.value).subscribe(
        (res) => {
          console.log('merchant successfully updated!');
        }, (error) => {
          console.log(error);
        });
    }
  }

  onDelete() {
    console.log('Going to delete something');
    if (window.confirm('Are you sure?')) {
      this.merchantService.deletemerchant(this.id).subscribe((data) => {
          localStorage.removeItem('merchanttoken');
          localStorage.removeItem('merchant');
          this.router.navigateByUrl('/index');
        }
      );
    }
  }

}
