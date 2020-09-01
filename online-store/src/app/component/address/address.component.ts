import { Component, OnInit, Input } from '@angular/core';
import { Address } from 'src/app/model/Address';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit {

  addressList: Address[];
  @Input() ProfileView: boolean = false;
  ShowView: boolean = false;
  selectedAddressIndex: number = -1;
  editForm: FormGroup;
  isNewAddress = false;
  constructor(private formBuilder: FormBuilder) {
    this.addressList = [
      { address: "تهران، خیابان شریعتی، بالاتر از ملک، خیابان کشواد، خیابان کلیم کاشانی، پلاک 22، واحد 8", deliverTo: "مارال فتحعلی", isCurrent: true, mobilePhone: "09123456789", postalCode: "1234567890" },
      { address: "جردن کلم کاظمی پلاک 2", deliverTo: "مارال فتحعلی", isCurrent: true, mobilePhone: "09123456789", postalCode: "1234567890" },
      { address: "جردن کلم کاظمی پلاک 2", deliverTo: "مارال فتحعلی", isCurrent: true, mobilePhone: "09123456789", postalCode: "1234567890" },
      { address: "جردن کلم کاظمی پلاک 2", deliverTo: "مارال فتحعلی", isCurrent: true, mobilePhone: "09123456789", postalCode: "1234567890" },
      { address: "جردن کلم کاظمی پلاک 2", deliverTo: "مارال فتحعلی", isCurrent: true, mobilePhone: "09123456789", postalCode: "1234567890" },
      { address: "جردن کلم کاظمی پلاک 2", deliverTo: "مارال فتحعلی", isCurrent: true, mobilePhone: "09123456789", postalCode: "1234567890" },
      { address: "جردن کلم کاظمی پلاک 2", deliverTo: "مارال فتحعلی", isCurrent: true, mobilePhone: "09123456789", postalCode: "1234567890" },
      { address: "جردن کلم کاظمی پلاک 2", deliverTo: "مارال فتحعلی", isCurrent: true, mobilePhone: "09123456789", postalCode: "1234567890" },
      { address: "جردن کلم کاظمی پلاک 2", deliverTo: "مارال فتحعلی", isCurrent: true, mobilePhone: "09123456789", postalCode: "1234567890" },
      { address: "جردن کلم کاظمی پلاک 2", deliverTo: "مارال فتحعلی", isCurrent: true, mobilePhone: "09123456789", postalCode: "1234567890" }
    ];


  }

  ngOnInit(): void {
    this.editForm = this.formBuilder.group({
      address: ['', Validators.required],
      mobilePhone: ['', [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
      postalCode: ['', [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
      deliverTo: ['', Validators.required]
    })
  }

  onEditSubmit(event) {
    if (event.submitter.id === "closeButton") {
      this.ShowView = false;
      if(this.isNewAddress){
        this.addressList.splice(this.addressList.length - 1, 1);
        this.isNewAddress = false;
      }
    } else {
      this.ShowView = false;
      this.addressList[this.selectedAddressIndex].address = this.editForm.get('address').value;
      this.addressList[this.selectedAddressIndex].deliverTo = this.editForm.get('deliverTo').value;
      this.addressList[this.selectedAddressIndex].mobilePhone = this.editForm.get('mobilePhone').value;
      this.addressList[this.selectedAddressIndex].postalCode = this.editForm.get('postalCode').value;
    }
  }

  newAddress() {
    this.isNewAddress = true;
    this.addressList.push(new Address);
    this.showViewToggle(this.addressList.length - 1);
  }

  showViewToggle(index) {
    this.selectedAddressIndex = index;
    this.editForm.patchValue({
      address: this.addressList[index].address,
      deliverTo: this.addressList[index].deliverTo,
      mobilePhone: this.addressList[index].mobilePhone,
      postalCode: this.addressList[index].postalCode,
    });
    if (this.ShowView === false) {
      this.ShowView = true;
    } else {
      this.ShowView = false;
    }
  }

  deleteAddress(index) {
    this.addressList.splice(index, 1);
  }
}
