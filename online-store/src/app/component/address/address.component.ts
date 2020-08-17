import { Component, OnInit, Input } from '@angular/core';
import { Address } from 'src/app/model/Address';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit {

  addressList:Address[];
  @Input() ProfileView: boolean = false;
  ShowView: boolean = false;
  selectedAddressIndex:number = -1;
  editForm = new FormGroup({
    address: new FormControl(''),
    mobilePhone: new FormControl(''),
    postalCode: new FormControl(''),
    deliverTo: new FormControl('')
  });

  constructor() { 
    this.addressList =[
      {address:"تهران، خیابان شریعتی، بالاتر از ملک، خیابان کشواد، خیابان کلیم کاشانی، پلاک 22، واحد 8",deliverTo:"مارال فتحعلی",isCurrent:true,mobilePhone:"09123456789",postalCode:"1234567890"},
      {address:"جردن کلم کاظمی پلاک 2",deliverTo:"مارال فتحعلی",isCurrent:true,mobilePhone:"09123456789",postalCode:"1234567890"},
      {address:"جردن کلم کاظمی پلاک 2",deliverTo:"مارال فتحعلی",isCurrent:true,mobilePhone:"09123456789",postalCode:"1234567890"},
      {address:"جردن کلم کاظمی پلاک 2",deliverTo:"مارال فتحعلی",isCurrent:true,mobilePhone:"09123456789",postalCode:"1234567890"},
      {address:"جردن کلم کاظمی پلاک 2",deliverTo:"مارال فتحعلی",isCurrent:true,mobilePhone:"09123456789",postalCode:"1234567890"},
      {address:"جردن کلم کاظمی پلاک 2",deliverTo:"مارال فتحعلی",isCurrent:true,mobilePhone:"09123456789",postalCode:"1234567890"},
      {address:"جردن کلم کاظمی پلاک 2",deliverTo:"مارال فتحعلی",isCurrent:true,mobilePhone:"09123456789",postalCode:"1234567890"},
      {address:"جردن کلم کاظمی پلاک 2",deliverTo:"مارال فتحعلی",isCurrent:true,mobilePhone:"09123456789",postalCode:"1234567890"},
      {address:"جردن کلم کاظمی پلاک 2",deliverTo:"مارال فتحعلی",isCurrent:true,mobilePhone:"09123456789",postalCode:"1234567890"},
      {address:"جردن کلم کاظمی پلاک 2",deliverTo:"مارال فتحعلی",isCurrent:true,mobilePhone:"09123456789",postalCode:"1234567890"}
    ];

    
   }

  ngOnInit(): void {
  }

  onEditSubmit(){
    this.ShowView = false;
    this.addressList[this.selectedAddressIndex].address = this.editForm.get('address').value;
    this.addressList[this.selectedAddressIndex].deliverTo = this.editForm.get('deliverTo').value;
    this.addressList[this.selectedAddressIndex].mobilePhone = this.editForm.get('mobilePhone').value;
    this.addressList[this.selectedAddressIndex].postalCode = this.editForm.get('postalCode').value;
  }

  showViewToggle(index){
    this.selectedAddressIndex = index;
    this.editForm.patchValue({
      address:this.addressList[index].address,
      deliverTo:this.addressList[index].deliverTo,
      mobilePhone:this.addressList[index].mobilePhone,
      postalCode:this.addressList[index].postalCode,
    });
    if(this.ShowView === false){
      this.ShowView = true;
    }else{
      this.ShowView = false;
    }
  }
}
