import {Component, OnInit} from '@angular/core';
import {UserService} from '../../services/user.service';
import {MerchantService} from '../../services/merchant.service';
import {QueueService} from '../../services/queue.service';
import {User} from '../../model/user.model';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  merchants: any = [];
  user: User;
  id: any;
  currentQueue: any = {};
  intervalId = 0;
  seconds = 11;

  constructor(private userService: UserService, private merchantService: MerchantService, private queueService: QueueService) {
    this.id = localStorage.getItem('user');
    this.merchantService.getEmployees().subscribe((data) => {
      this.merchants = data;
    });
    this.userService.getUser(this.id).subscribe((data) => {
      this.user = data;
    });
    this.countDown();
  }

  ngOnInit(): void {
  }

  refreshQueue() {
    this.queueService.getUserQueue(this.id).subscribe((data) => {
      this.currentQueue = data;
    });
  }

  addIntoQueue(merchant) {
    this.queueService.createqueue({
      userid: this.id,
      merchantid: merchant._id,
      shopname: merchant.shopname,
      merchantname: merchant.firstname,
      merchantphone: merchant.mobilenumber,
      username: this.user.firstname,
      userphone: this.user.mobilenumber
    }).subscribe((data) => {
      console.log(data);
      console.log('User is added to queue successfully');
      // this.refreshQueue();
    });
  }

  private countDown() {
    this.intervalId = window.setInterval(() => {
      this.seconds -= 1;
      this.refreshQueue();
      if (this.seconds < 0) {
        this.seconds = 10;
      } // reset
    }, 1000);
  }
}
