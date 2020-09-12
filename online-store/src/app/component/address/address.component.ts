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

  onEditSubmit(event) {
    if (event.submitter.id === "closeButton") {
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

  newAddress() {
    this.isNewAddress = true;
    this.addressList.push(new Address);
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
    this.addressList.splice(index, 1);
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