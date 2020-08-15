import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/service/Cart/cart.service';

@Component({
  selector: 'app-confirm-cart',
  templateUrl: './confirm-cart.component.html',
  styleUrls: ['./confirm-cart.component.scss']
})
export class ConfirmCartComponent implements OnInit {

  productList: any;
  editAddress: boolean = false;
  constructor(private cartService: CartService) { 
    this.productList =  cartService.getItems();
  }

  ngOnInit(): void {
    
  }

  editAddressView(){
    if(this.editAddress === false){
      this.editAddress = true;
    }else{
      this.editAddress = false;
    }
  }
}
