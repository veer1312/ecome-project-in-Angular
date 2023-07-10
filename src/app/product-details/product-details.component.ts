
 import { cart, product } from './../data-type';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  productData:undefined|product;
  removeCart = false;
  cartData:product | undefined;

  productQuantity:number=1;
  constructor(private activeRout:ActivatedRoute,private product:ProductService){}

  ngOnInit(): void {

    let productId = this.activeRout.snapshot.paramMap.get('productId');
    console.warn(productId);
    productId && this.product.getproduct(productId).subscribe((result)=>{
      console.warn(result);
      this.productData = result; 
      
      

      // REMOVE ITEM
      let cartData = localStorage.getItem('localCart');       //if there is any data in the localCart
      if(productId && cartData){                              // and it contain productId
        let items = JSON.parse(cartData);                      //then parse that perticularr items into JSON format
        // if there is the id of that items then show the remove cart option
        items = items.filter((items:product)=>productId == items.id.toString())     //take a value inside the item    //filter is a function which can get the object keys values of an array by a key
          //means any id matches with this then there is a item present inside it....then
          if(items.length){
            this.removeCart = true;

          }
          else{
            this.removeCart = false;
          } 
          

      }
      // for after refreshing the data have to be there in the cart

      let user = localStorage.getItem('user');
      if(user){                                             //if user present the  parse it and give the userid and store it inside the userId variable
      let userId = user && JSON.parse(user).id;
    this.product.getCartList(userId);
    this.product.cartData.subscribe((result)=>{             //subcsribe the cart data for getting all the cart result

    let item = result.filter((item:product)=>productId?.toString()===item.productId?.toString())   //the clicked product should be matched with the database propductId

    if(item.length){

      this.cartData = item[0];
      this.removeCart = true; 
    }
    })


      }
    })
 
  } 
  handleQuantity(val:string){
    if(this.productQuantity<15 && val =="plus"){
      //  this.productQuantity = this.productQuantity+1;  //same as the following line
      this.productQuantity+=1;
    }
    else if(this.productQuantity>1 && val =="min"){
      // this.productQuantity = this.productQuantity-1;
      this.productQuantity-=1;
    }
  }

  AddToCart(){
    if(this.productData){
    this.productData.quantity = this.productQuantity;
    if(!localStorage.getItem('user')){                //if user is not login(no user in the localStorage) then exicute the part
    // console.warn(this.productData);
    this.product.localAddToCart(this.productData);
    this.removeCart = true;
    }
    else{
       console.warn("user is logged in");               //check the user is loggedin or not
      let user = localStorage.getItem('user');          //get all the user data of localStorage inside the user variavble
      let userId = user && JSON.parse(user).id;         //store the user id inside the userId variable byb parsing the user data
      console.warn(userId);                             //check if we are getting the user data or not
// now store the item  data and the userId inside a variable

let cartData:cart = { 
  ...this.productData, 

  userId,
  productId:this.productData.id,       //for deleting the product id we are taking this                               //we are taking user id ,productid here inside the cart data
}
delete cartData.id;                             //delete the product id
console.warn(cartData);
this.product.addToCart(cartData).subscribe((result)=>{                //show all the information of the cart data and storerb it inside the api
  if(result){
    // alert("item is added in the cart");
    this.product.getCartList(userId);
    this.removeCart = true;
  }
});

    }

    }
  } 

  removeToCart(productId:number){

    if(!localStorage.getItem('user')){
    this.product.removeItemfromCart(productId);
    }


    else{

      //get a user id  for this...we have to get the user id
      let user = localStorage.getItem('user');                 
      let userId = user && JSON.parse(user).id;
      console.warn(this.cartData);
     this.cartData && this.product.removeToCart(this.cartData.id).subscribe((result)=>{          //this cartData should be defined

      if(result){
        // we have to call the api again for the updation of the cart after removing the item.and for this we need a user id
        this.product.getCartList(userId);

      }
     })
    this.removeCart = false;          //for add to cart and remove to cart button function

      

    }
  }

}
