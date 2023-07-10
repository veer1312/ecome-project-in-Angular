import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { cart, order } from '../data-type';
import { Router} from '@angular/router';
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit{

  orderMsg:string|undefined;        //taking a variable to show the messege

  totalPrice:number|undefined;  
  cartdata:cart[]|undefined;       
//taking a variable for storing the priceValue
constructor(private product:ProductService, private router:Router){  }

  ngOnInit(): void {
    this.product.currentCart().subscribe((result) => {
      

      //for counting the total price
      let price = 0;
      this.cartdata = result;                             //putting all the data inside the cartdata variable
      result.forEach((item) => {
        if(item.quantity){
          price = price + (+item.price * +(item.quantity))                   //this will convert the string into integer and calculate the total price with quantity
        }
     
      })
      this.totalPrice=price+ (price/10)+100-(price/10);;          //mentioning the variable here

console.warn(this.totalPrice);
    });
  }

orderNow(data:{email:string,address:string,contact:string}){
  // console.warn(data);

// now we have to collect the data of user and its order list and its price
  
let user = localStorage.getItem('user');
let userId = user && JSON.parse(user).id;

if(this.totalPrice){
  let orderData:order={
    ...data, 

    totalPrice:this.totalPrice,
    userId,
    id:undefined
  }
  // before redirecting we will remove the data from the cart
  this.cartdata?.forEach((item)=>{

    setTimeout(() => {
    item.id && this.product.deleteCartitem(item.id)         //if there is an id and the id is not undefined then delete the item
      
    }, 1000);
  })




this.product.orderNow(orderData).subscribe((result)=>{
  console.warn(result);
  
if(result){
  // alert('Ording successfully');

  this.orderMsg="your order hasbeeen placed";
  setTimeout(() => {
  this.router.navigate(['/my-oders']);                  //it will show the order mesege and the the page will be redirect
    this.orderMsg=undefined           //if there is any problem during the redirecting the page then atleast ther messege will popup
  }, 4000);
  
}
})

}
}
}
