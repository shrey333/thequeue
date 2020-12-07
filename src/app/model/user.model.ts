import { Moment } from 'moment';
export class User {
  _id: string;
  firstname: string;
  lastname: string;
  dateofbirth: Moment;
  email: string;
  password: string;
  mobilenumber: number;
  address1: string;
  address2: string;
  city: string;
  state: string;
  pincode: number;
}
