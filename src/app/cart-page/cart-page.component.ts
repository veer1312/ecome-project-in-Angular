import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { cart, priceSummary } from '../data-type';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent implements OnInit {

  cartData: cart[] | undefined;
  priceSummary: priceSummary = {
    price: 0,
    discount: 0,
    tax: 0,
    delivery: 0,
    total: 0,
  }
    constructor(private product: ProductService ,private route:Router) { } 
    
    ngOnInit(): void {

    this.loadDetails()
  
  }
  loadDetails(){
    
    this.product.currentCart().subscribe((result) => {
      this.cartData = result;

      //for counting the total price
      
      let price = 0;
      result.forEach((item) => {
        if(item.quantity){
          price = price + (+item.price * +(item.quantity))                   //this will convert the string into integer and calculate the total price with quantity
        }
     
      });
       
        // now we have to calculate by the price with its discount...for that 
    this.priceSummary.price = price;
    this.priceSummary.discount = price/10;
    this.priceSummary.tax = price/10;
    this.priceSummary.delivery = 50;
    this.priceSummary.total = price+ (price/10)+100-(price/10);                   //first price/10 is for the discount and 2nd is for the tax
    if(!this.cartData.length){                        //if there is no length in cartData means its 0 then navigate to the home page
      this.route.navigate(['/'])
    }
  
  });
  }
  
  Checkout(){
    this.route.navigate(['/checkout']);

  }
  removeToCart(cartId:number | undefined){

    
    cartId && this.cartData && this.product.removeToCart(cartId)
     .subscribe((result)=>{        
      this.loadDetails();
     })
  }
}


