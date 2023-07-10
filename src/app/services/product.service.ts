import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { cart, order, product } from '../data-type';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  cartData = new EventEmitter<product[] | []>();

  constructor(private http:HttpClient) { }

  addProduct(data:product){
// console.log('service called');
return this.http.post('http://localhost:3000/products',data);
  }

  productList(){
    return this.http.get<product[]>('http://localhost:3000/products');          //means the API will return the product type array(which we have made in datatype.ts)
  }

  deleteProd(id:number){
    return this.http.delete(`http://localhost:3000/products/${id}`);
  }
  getproduct(id:string){
    return this.http.get<product>(`http://localhost:3000/products/${id}`);

  }

  updateProduct(product:product){
    return this.http.put<product>(`http://localhost:3000/products/${product.id}`,product);

  }

  popularProducts(){
    return this.http.get<product[]>('http://localhost:3000/products?_limit=3');
  }
  trendyProducts(){
    return this.http.get<product[]>('http://localhost:3000/products?_limit=7');
  }
  searchProducts(query:string){
    return this.http.get<product[]>(`http://localhost:3000/products?q=${query}`);
  }
//for adding the product in the cart

localAddToCart(data:product){

  let cartData = [];                                  //local variable
  let localCart = localStorage.getItem('localCart');

  if(!localCart){                                     //if there is nothing in side the localCart then
    localStorage.setItem('localCart',JSON.stringify([data]));       //check if the data is storing inside the local storage or not if not then store the data
    this.cartData.emit([data]);
  }
  //if there is any data inside the localCart then
  else{
    // console.warn('else');
    cartData = JSON.parse(localCart);
    cartData.push(data);                    //push all the data inside the cartData  then set the item
    localStorage.setItem('localCart',JSON.stringify(cartData));
    this.cartData.emit(cartData);

  }

  this.cartData.emit(cartData);           //cartData is a local variable and it will take the latest data and show it in the icon


}
removeItemfromCart(productId:number){                       //will chose the productId while removing the item
  let cartData = localStorage.getItem('localCart');           //take a variable cartDat in which we can store the localCart data
  if(cartData){                                               //if there is any data inside the localStorage then check the follwoing condition
    let items:product[] = JSON.parse(cartData);               //take another variable items in which we can store the cartData values by json format
    items = items.filter((item:product)=>productId !==item.id //if the id is not matching with the items stored in the items then remove the matched id and remain the non matching ids in that items variable    
    );
    // console.warn(items);
    localStorage.setItem('localCart',JSON.stringify(items));
  this.cartData.emit(items);           //cartData is a local variable and it will take the latest data and show it in the icon

  }
}
addToCart(cartData:cart){
  return this.http.post('http://localhost:3000/cart',cartData);                         //to store the cart data inside this api
}

getCartList(userId:number){
  return this.http.get<product[]>('http://localhost:3000/cart?userId'+userId,
  {observe:'response'}).subscribe((result)=>{
// console.warn(result);

if(result && result.body){                            //if  result..and the result have a body  and the body need not to be undefined
this.cartData.emit(result.body);

}
  })
}
removeToCart(cartId:number){
  return this.http.delete('http://localhost:3000/cart/'+cartId);

}  
currentCart(){

  let userStore = localStorage.getItem('user');
  let userData = userStore && JSON.parse(userStore);
  return this.http.get<cart[]>('http://localhost:3000/cart?userId='+userData.id)
}
orderNow(data:order){
  return this.http.post('http://localhost:3000/orders',data)
}
orderList(){
  let userStore = localStorage.getItem('user');
  let userData = userStore && JSON.parse(userStore);
  return this.http.get<order[]>('http://localhost:3000/orders?userId='+userData.id);
}

deleteCartitem(cartId:number){

  return this.http.delete('http://localhost:3000/cart/'+ cartId,{observe:'response'}).subscribe((result)=>{
    if(result){
      this.cartData.emit([])
    } 
  })
}
cancleOrder(orderId:number){
return this.http.delete('http://localhost:3000/orders/'+orderId);                   //it will delete the order by its id
}
}
