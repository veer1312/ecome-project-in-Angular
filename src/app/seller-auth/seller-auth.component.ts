import { Component,OnInit } from '@angular/core';
import { SellerService } from '../services/seller.service';
import { login, signup } from '../data-type';

@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.css']
})
export class SellerAuthComponent implements OnInit {


  showlogin = false;
  authError:String ='';

  constructor(private seller:SellerService,){}
  ngOnInit(): void {
    this.seller.reloadSeller()
  }
  signUp(data:signup){            //signup and login are the data types
    this.seller.userSignUp(data)

  }
  userlogin(data:login){
    // console.log(data);
    this.authError = "";
    this.seller.userLogin(data);    //now it will print the data of the servicer file if its working
    this.seller.isLoginerror.subscribe((iserror)=>{
      if(iserror){
        this.authError = "email or password is incorrect"
      }
    })
  }
  openLogin(){
this.showlogin=true;
  }
  openSignup(){
    this.showlogin=false;
  }

}
