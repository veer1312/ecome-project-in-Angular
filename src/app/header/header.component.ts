import { Component, OnInit } from '@angular/core';
import{Router} from '@angular/router';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  menutype:string = 'default';

  sellerName:string='';
  userName:string='';
  searchresult:undefined|product[];

  cartItems = 0;



  constructor(private route:Router, private product:ProductService){}

  ngOnInit(): void {
    this.route.events.subscribe((val:any)=>{
      // console.warn(val.url);
      if(val.url){
        if(localStorage.getItem('seller') && val.url.includes('seller')){
          // console.warn("inside the seller area");
          this.menutype = "seller";

          if(localStorage.getItem('seller')){
            let sellerStore = localStorage.getItem('seller');
            let sellerData = sellerStore && JSON.parse(sellerStore)[0];
            this.sellerName = sellerData.name;
          }
        }
// for user login part
        else if(localStorage.getItem('user')){
          let userStore = localStorage.getItem('user');   //it means there is something inside the localStorage..and if there is something in the local storage then....put that value in the variable
          let userData = userStore && JSON.parse(userStore);
          this.userName = userData.name;
          this.menutype = 'user';
          this.product.getCartList(userData.id); 

        }
        else{
          // console.warn("out side the seller");
          this.menutype = "default";
        }
      }
    });

    // show item in the cart option part
    let cartData = localStorage.getItem('localCart');
    if(cartData){
      this.cartItems = JSON.parse(cartData).length;
    }
    this.product.cartData.subscribe((items)=>{
      this.cartItems=items.length;
    })
  }

  //seller logout

  logout(){
    localStorage.removeItem('seller');
    this.route.navigate(['/']);
  }

  // userlogout
  userlogout(){
    localStorage.removeItem('user');
    this.route.navigate(['/user-auth']);
    this.product.cartData.emit([]);

  }

  searchProduct(query:KeyboardEvent){
    if(query){
      const element = query.target as HTMLInputElement;
      // console.warn(element.value);
      this.product.searchProducts(element.value).subscribe((result)=>{
        // console.log(result);
        if(result.length > 4){
        result.length= 4;

        }
        this.searchresult = result;
      })

    }

  }
  hidesearch(){
    this.searchresult = undefined;
  }

  submitSearch(val:string){
// console.warn(val)
this.route.navigate([`search/${val}`])
  }

  redirectToDetails(id:number){
this.route.navigate(['/details/'+id])
  }
}
