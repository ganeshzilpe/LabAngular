import{Product} from './product';
import{Location}from './location';
export class OrderLine{
  quantity:number;
  productID:number;
  locationID:string;
  price:number;
  picked:boolean;
  product:Product;
  location:Location;
}
