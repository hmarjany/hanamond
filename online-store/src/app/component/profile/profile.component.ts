import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from 'src/app/model/User';
import { Address } from 'src/app/model/Address';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  isLinear = true;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  address: Address[];
  currentUser: User;
  isDataAvailable = false;

  constructor(private _formBuilder: FormBuilder,
    private http: HttpClient) {
      this.currentUser = new User();
  }

  ngOnInit() {
    let httpParams = new HttpParams()
      .set('userId', JSON.parse(localStorage.getItem('currentUser'))._id);
    this.http.get<User>('http://127.0.0.1:3100/users/getById', { params: httpParams }).subscribe(data => {
      this.currentUser = data;
      this.address  = this.currentUser.address;
      this.isDataAvailable = true;
    });

    this.firstFormGroup = this._formBuilder.group({
      name: [this.currentUser.name, Validators.required],
      phone: [this.currentUser.phoneNumber, Validators.required]
    });
  }

  save() {
    this.http.post<User>('http://127.0.0.1:3100/users/updateUser', this.currentUser).subscribe(data => {
      this.currentUser = data;
    });
  }

  onAddresses(addresses: Address[]) {
    this.currentUser.address = addresses;
  }

}
