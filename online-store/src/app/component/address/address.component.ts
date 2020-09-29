import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Address } from 'src/app/model/Address';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})

export class AddressComponent implements OnInit {

  @Output() addresses = new EventEmitter<Address[]>();
  @Output() selectAddressChangeEvent = new EventEmitter<number>();
  @Input() addressList: Address[] = [];
  @Input() ProfileView: boolean = false;
  ShowView: boolean = false;
  selectedAddressIndex: number = -1;
  editForm: FormGroup;
  isNewAddress = false;
  contentAfterWidth: any;

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnChanges(){
    this.contentWidth();
  }

  ngOnInit(): void {
      this.editForm = this.formBuilder.group({
      address: ['', Validators.required],
      mobilePhone: ['', [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
      postalCode: ['', [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
      deliverTo: ['', Validators.required]
    })
  }

  onEditSubmit() {
    if (document.activeElement.id === "closeButton") {
      this.ShowView = false;
      if (this.isNewAddress) {
        this.addressList.splice(this.addressList.length - 1, 1);
        this.isNewAddress = false;
      }
    } else {
      this.ShowView = false;
      this.addressList[this.selectedAddressIndex].address = this.editForm.get('address').value;
      this.addressList[this.selectedAddressIndex].deliverTo = this.editForm.get('deliverTo').value;
      this.addressList[this.selectedAddressIndex].mobilePhone = this.editForm.get('mobilePhone').value;
      this.addressList[this.selectedAddressIndex].postalCode = this.editForm.get('postalCode').value;
      this.addresses.emit(this.addressList);
    }
  }

  selectAddressCheck(i: number){
    this.selectAddressChangeEvent.emit(i);
  }

  changed(i, event){
    if(this.addressList != undefined && this.addressList != null && this.addressList.length > 0){
      this.addressList.map((item, index) => {
        if(index != i){
          item.isCurrent = false;
        }else{
          item.isCurrent = true;
          event.target.checked = true;
        }
      })
    }else{
      return;
    }
  }
  newAddress() {
    this.isNewAddress = true;
    if(this.addressList != undefined && this.addressList != null && this.addressList.length > 0){
      this.addressList.map(item=>{
        item.isCurrent = false;
      })
    }
    var newAddress = new Address();
    newAddress.isCurrent = true;
    this.addressList.push(newAddress);
    this.contentWidth();
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
    if(this.addressList[index].isCurrent != null && this.addressList[index].isCurrent){
      if(this.addressList[0]!=null && this.addressList[0]!=undefined){
        this.addressList[0].isCurrent = true;
      }
    }
    this.addressList.splice(index, 1);
    
    if(this.addressList.length === 1){
      this.addressList[0].isCurrent = true;
    }
    this.contentWidth();
  }

  private contentWidth() {
    if (this.addressList === undefined) {
      this.contentAfterWidth = null;
    } else {
      if ((this.addressList.length + 1) % 3 == 0) {
        this.contentAfterWidth = null;
      }

      if ((this.addressList.length + 1) % 3 == 1) {
        this.contentAfterWidth = '62.4%';
      }

      if ((this.addressList.length + 1) % 3 == 2) {
        this.contentAfterWidth = '29%';
      }
    }
  }
}
