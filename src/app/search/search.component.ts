import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  searchProduct:undefined | product[];


  constructor(private activeRoiute:ActivatedRoute, private product:ProductService){}
  ngOnInit(): void {
    let query = this.activeRoiute.snapshot.paramMap.get('query');     //query is define in  the app.routing.module.ts file in search component path

    console.warn(query);
    query && this.product.searchProducts(query).subscribe((result)=>{
      console.log(result);
      this.searchProduct = result;
    })
  }

}
