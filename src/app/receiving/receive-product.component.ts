import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/catch';

@Component({
  selector: 'nw-receive-product',
  templateUrl: './receive-product.component.html',
  styleUrls: ['./receive-product.component.css']
})
export class ReceiveProductComponent implements OnInit {

  constructor( private _http:Http) { }

  ngOnInit() {
  }
  private trackingNumber:string;
  private showForm:boolean;
  private productID:number;
  private quantity:number;
  private receivedProducts:Array<any>;

  saveTrackingNumber(){
    this.showForm = true;
    this.receivedProducts = new Array<any>();
    console.log(this.trackingNumber);
  }

  receiveProduct(productID, quantity){
    console.log("button click")

    this._http.get("/api/products/"+productID)
    .catch(err => console.error(err))
    .subscribe( res =>
      {
        console.log("Inside", res.json());
        let product = res.json();
        product.quantity = quantity;
        this.receivedProducts.push(product);
      });

   /* let product = {};
    product.productID = productID;
    product.quantity = quantity;

    console.log(this.receivedProducts);*/
    this.productID=undefined;
    this.quantity=undefined

  }

  finishedReceiving(){
    console.log("button click")
  }
}
