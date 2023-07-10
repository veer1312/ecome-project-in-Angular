import { EventEmitter, Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { login, signup } from '../data-type';
import { BehaviorSubject } from 'rxjs';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SellerService {

  isSellerLogedIn = new BehaviorSubject<boolean>(false);
  isLoginerror  = new EventEmitter<boolean>(false);

  constructor(private http:HttpClient,private router:Router) { }

  userSignUp(data:signup){

    return this.http.post('http://localhost:3000/seller',data,{observe:'response'}).subscribe((result)=>{
    this.isSellerLogedIn.next(true);
    localStorage.setItem('seller',JSON.stringify(result.body))      //it will store the data in local storage
    this.router.navigate(['seller-home']);

      console.warn("result",result);
    })
  }

  reloadSeller(){
    if(localStorage.getItem('seller')){
      this.isSellerLogedIn.next(true);
    this.router.navigate(['seller-home']);           //we did this comment for not using the authentication
    }
  }

  userLogin(data:login){
console.log(data);
// api will be called here

this.http.get(`http://localhost:3000/seller?email=${data.email}&password=${data.password}`,

{observe:'response'}).subscribe((result:any)=>{
// console.warn(result);
if(result && result.body && result.body.length){
  // console.warn("user logged in")
  localStorage.setItem('seller',JSON.stringify(result.body))      //it will store the data in local storage
    this.router.navigate(['seller-home']);
}
else{
  console.warn("Login failed");
  this.isLoginerror.emit(true);
}

});


  }
}
