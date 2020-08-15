import { Component, OnInit, Input } from '@angular/core';
import { Address } from 'src/app/model/Address';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit {

  addressList:Address[];
  @Input() ProfileView: boolean = false;
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
}
