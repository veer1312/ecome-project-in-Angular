import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';

@Component({
  selector: 'app-seller-add-product',
  templateUrl: './seller-add-product.component.html',
  styleUrls: ['./seller-add-product.component.css']
})
export class SellerAddProductComponent implements OnInit {

  constructor(private product:ProductService){}

AddProductmessage:string|undefined;

  ngOnInit(): void {
  }

  submit(data:product){
    // console.warn(data);
    this.product.addProduct(data).subscribe((result)=>{
      console.log(result);
      if(result){
        this.AddProductmessage="Item added successfully !!";
      setTimeout(()=>(this.AddProductmessage = undefined),3000);

      }
      else{
        this.AddProductmessage="something went wrong !!"
      }
    });

  }


}
