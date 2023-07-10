import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';
import { Router } from '@angular/router';

@Component({
  selector: 'app-seller-update-product',
  templateUrl: './seller-update-product.component.html',
  styleUrls: ['./seller-update-product.component.css']
})
export class SellerUpdateProductComponent implements OnInit {

productData: undefined | product;

productMessege:undefined | string;
constructor(private route:ActivatedRoute,private product:ProductService, private router:Router){}

  ngOnInit(): void {

    let productid = this.route.snapshot.paramMap.get('id');       //id is because we declar it inside the app-routing.module.ts.if we were took name there then we have to take name in place of id

    // console.warn("product id is",productid);
    productid && this.product.getproduct(productid).subscribe((data)=>{
      // console.warn(data);
      this.productData = data;
    })

  }


  submit(data:product){
// console.warn(data);
if(this.productData){
  data.id = this.productData.id;
}

this.product.updateProduct(data).subscribe((result)=>{
  console.warn(result);

  if(result){
    this.productMessege="Product Updated Successfully";

    // setTimeout(()=>(this.AddProductmessage = undefined),5000);
    setTimeout(()=>{this.productMessege = undefined},3000);
this.router.navigate(['seller-home']);


  }
  else{
    this.productMessege = "Failed To Update The Product"
  }
})
  }



}
