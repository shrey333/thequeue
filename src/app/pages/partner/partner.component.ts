import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {MerchantService} from '../../services/merchant.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-partner',
  templateUrl: './partner.component.html',
  styleUrls: ['./partner.component.css']
})
export class PartnerComponent implements OnInit {
  merchantForm: FormGroup;
  emailTaken: boolean;

  constructor(private fb: FormBuilder, private router: Router, private merchantService: MerchantService) {
    console.log('In PartnerComponent');
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
      pincode: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
  }

  get firstname() {
    return this.merchantForm.get('firstname');
  }

  get lastname() {
    return this.merchantForm.get('lastname');
  }

  get shopname() {
    return this.merchantForm.get('shopname');
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


  onSubmit() {
    console.log('in onsubmit of PartnerComponent');
    if (!this.merchantForm.valid) {
      return false;
    } else {
      this.merchantService.createmerchant(this.merchantForm.value).subscribe(
        (res) => {
          localStorage.setItem('merchanttoken', res.merchanttoken);
          localStorage.setItem('merchant', res.merchantid);
          console.log(res);
          console.log('merchant successfully created!');
          this.router.navigateByUrl('/merchant/homepage').then(r => console.log(r));
          // this.ngZone.run(() => this.router.navigateByUrl('/homepage'));
        }, (error) => {
          console.log(error);
        });
    }
  }

  emailUnique() {
    this.emailTaken = false;
    this.merchantService.checkEmailNotTaken(this.merchantForm.controls['email'].value).subscribe(res => {
      if (res.taken) {
        this.emailTaken = true;
      } else {
        this.emailTaken = false;
      }
    });
  }
}
