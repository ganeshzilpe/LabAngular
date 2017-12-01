import { Component, OnInit } from '@angular/core';
import {Order} from '../shared/order';
import {Http} from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'nw-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  orders:Array<any>;
  constructor(private _http:Http) {
  }

  ngOnInit() {
    this.getOrderReadyToShip();
  }

  getOrderReadyToShip() {
    this.orders=new Array<any>();
    this._http.get("/api/orders/readyToShip").toPromise().then((res)=> {
      this.orders = res.json();
      console.log("inside",this.orders);
    }, (err)=> {
      console.log("fail")
    });
  }
}
