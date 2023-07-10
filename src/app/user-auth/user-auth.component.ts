import { Component, OnInit } from '@angular/core';
import { cart, login, product, signup } from '../data-type';
import { UserService } from '../services/user.service';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css'],
})
export class UserAuthComponent implements OnInit {


  showLogin:boolean =true;

  authErroerr:string="";


  constructor(private user:UserService, private product:ProductService){ }

  ngOnInit(): void {
    this.user.userAuthreload();
  }

  signUp(data: signup) {
    // console.log(data);
    this.user.userSignUp(data);

  }
  Login(data:login){
    this.user.userLogin(data);
    this.user.invalidUserAuth.subscribe((result)=>{
      console.log(result);

    if(result){
      this.authErroerr = "Please Enter a valid Email";

    }
    else{
      this.localCartToremoteCart();
    }

    });
 
  }
  openLogin(){
this.showLogin = true;
  }
  openSignUp(){
    this.showLogin = false;

  }


  localCartToremoteCart(){
// we have to get the cart data and the user data inside it from localCart...for this
let data = localStorage.getItem('localCart');
let user = localStorage.getItem('user');
 let userId = user && JSON.parse(user).id;               //make the user data into parse 
if(data){
  let cartDataList:product[] = JSON.parse(data);                                        //make the cart data into parse

cartDataList.forEach((product:product,index) => {                       //second parameter is index by which we can remove item from the local storage                   
  let cartData:cart = {
    ...product,
    productId:product.id,
   userId,
  };

  delete cartData.id;
  setTimeout(()=>{
    this.product.addToCart(cartData).subscribe((result)=>{
      if(result){
        console.warn("item stored in DB");
      }
    })
    if(cartDataList.length===index+1){                    //if the cart have the last item then (index+1 = last item of the cart)
      localStorage.removeItem('localCart');
    }
  },500);
  
});
}
 
// after the user login we are working for the cart
// use settimeout here for not fecing the error

setTimeout(() => {
this.product.getCartList(userId);
  
}, 1000);
  }
}
