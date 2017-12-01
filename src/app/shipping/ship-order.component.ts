import { Component, OnInit } from '@angular/core';
import {Order} from '../shared/order';
import {OrderLine} from '../shared/orderLine';
import {Product} from '../shared/product';
import { ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http'
import 'rxjs/add/operator/catch'

@Component({
  selector: 'nw-ship-order',
  templateUrl: './ship-order.component.html',
  styles: [`
  .big-checkbox{
  transform: scale(2);
  }
  `]
})
export class ShipOrderComponent implements OnInit {

  constructor(private _route:ActivatedRoute, private _http:Http) {
  }

  order:Order;
  locationAvailable:boolean;

  ngOnInit() {
    let id = this._route.snapshot.params['orderId'];
    this.order = new Order();
    this.order.orderID = id;
    this.order.orderDate = new Date();
    this.order.shipVia = 1;
    this.order.shipping = 10;
    this.order.shipName = "Ororo Monroe";
    this.order.shipAddress = "777 Placeholder Pl";
    this.order.shipCity = "Birnin Zana";
    this.order.shipRegion = "RG";
    this.order.shipCountry = "Wakanda";
    this.order.shipPostalCode = "5T4N-L33";
    this.order.status = 0;
    this.order.lines = [];
    const line1 = new OrderLine();
    line1.locationID = "";
    line1.price = 30.00;
    line1.productID = 1;
    line1.quantity = 2;
    line1.product = new Product();
    line1.product.name = "Oreos";
    line1.product.imageUrl = "/assets/images/productImages/34.jpg";
    const line2 = new OrderLine();
    line2.locationID = "";
    line2.price = 30.00;
    line2.productID = 2;
    line2.quantity = 7;
    line2.product = new Product();
    line2.product.name = "Peanuts";
    line2.product.imageUrl = "/assets/images/productImages/67.jpg";
    this.order.lines.push(line1);
    this.order.lines.push(line2);
  }

  isReadyToShip() {
    //this.order.lines.forEach(line => line.picked = true);
    return this.order.lines.every(line => line.picked);
  }

  getBestLocation(orderLine) {
    this._http.get("/api/locations/forProduct/" + orderLine.productID).catch(err => console.error("fail")).subscribe(res => {
      console.log(res.json());
      orderLine.locationID = res.json()[0].locationID
    });
  }

  markAsShipped(order) {
    //order.status = 1;
    //console.log("Status: " + order.status);
    this._http.patch("/api/orders/" + order.orderID + "/MarkAsProblem", {"status":1}).catch(err => console.log("fail")).subscribe(res => console.log(res.json()));

  }

  markWithProblem(order) {
    this._http.patch("/api/orders/" + order.orderID + "/MarkAsProblem", {"status":2}).catch(err => console.log("fail")).subscribe(res => console.log(res.json()));
    //order.status = 2;
    //console.log("Status: " + order.status);
  }

}
