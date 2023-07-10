import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';

@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.css']
})
export class SellerHomeComponent implements OnInit {

  showDeleteMessege:string|undefined;

  productList:undefined|product[];



  constructor(private product:ProductService){}
  ngOnInit(): void {
    this.list();
  }
deleteProduct(id:number){
console.log("test id",id);
this.product.deleteProd(id).subscribe((res)=>{
console.log(res);

if(res){
  this.showDeleteMessege="Item deleted Successfully";
  setTimeout(()=>(this.showDeleteMessege = undefined),3000);
  this.list();

}
else{
  this.showDeleteMessege = "something Went Wrong";
}

})
}
list(){
  this.product.productList().subscribe((result)=>{
    // console.log(result);
    this.productList=result;      //result will be stored inside the productList variable
    // console.log(this.productList);

  });
}

}
