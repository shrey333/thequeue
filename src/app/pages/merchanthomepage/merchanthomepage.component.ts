import {Component, OnInit} from '@angular/core';
import {QueueService} from '../../services/queue.service';
import {MerchantService} from '../../services/merchant.service';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-merchanthomepage',
  templateUrl: './merchanthomepage.component.html',
  styleUrls: ['./merchanthomepage.component.css']
})
export class MerchanthomepageComponent implements OnInit {
  currentQueue: any = [];
  id: any;
  intervalId = 0;
  seconds = 11;

  constructor(private queueService: QueueService, private merchantService: MerchantService, private userService: UserService) {
    this.id = localStorage.getItem('merchant');
    this.countDown();
  }

  refreshQueue() {
    this.queueService.getMerchantQueue(this.id).subscribe((data) => {
      this.currentQueue = data;
    });
  }

  ngOnInit(): void {
  }

  turnIn(id) {
    this.queueService.deletequeue(id).subscribe((data) => {
      console.log(data);
      console.log('Data deleted successfully');
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
