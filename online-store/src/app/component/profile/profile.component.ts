import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from 'src/app/model/User';
import { Address } from 'src/app/model/Address';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { server } from 'src/app/Helper/server';
import { ErrorStateMatcher } from 'src/app/ErrorStateMatcher';
import { AuthService } from 'src/app/service/Auth/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  changePasswordFormGroup: FormGroup;
  address: Address[];
  currentUser: User;
  isDataAvailable = false;
  matcher = new ErrorStateMatcher();

  constructor(private _formBuilder: FormBuilder,
    private http: HttpClient,
    private authService: AuthService) {
    this.currentUser = new User();
  }

  ngOnInit() {
    let httpParams = new HttpParams()
      .set('userId', JSON.parse(localStorage.getItem('currentUser'))._id);
    this.http.get<User>(server.serverUrl + 'users/getById', { params: httpParams }).subscribe(data => {
      this.currentUser = data;
      this.address = this.currentUser.address;
      this.isDataAvailable = true;
    });

    this.firstFormGroup = this._formBuilder.group({
      name: [this.currentUser.name, Validators.required],
      phone: [this.currentUser.phoneNumber, Validators.required]
    });

    this.changePasswordFormGroup = this._formBuilder.group({
      password: ['', [Validators.required, Validators.min(6)]],
      confirmPass: ['', [Validators.required]]
    }, { validator: [this.checkPasswords, this.checkPasswordsLength] });
  }

  checkPasswords(group: FormGroup) {
    if (group == null) {
      return;
    }

    let pass = group.get('password').value;
    let confirmPass = group.get('confirmPass').value;

    return pass === confirmPass ? { notSame: false } : { notSame: true }
  }

  checkPasswordsLength(group: FormGroup) {
    if (group == null) {
      return;
    }

    let pass = group.get('password').value as string;


    if (pass.length < 6) {
      return { passLength: true };
    }

    return { passLength: false };
  }

  passwordChange() {
    const val = this.changePasswordFormGroup.value;
    var user = new User();

    user.email = this.currentUser.email;
    user.name = this.currentUser.name;
    user.password = val.password;
    user.phoneNumber = this.currentUser.phoneNumber;
    user._id = this.currentUser._id;

    if (user.email && user.password) {
      this.authService.changePassword(user)
        .subscribe(
          data => {
            console.log(data);
          },
          error => {
            console.log(error);
          },
          () => {

          }
        );
    }

  }

  save() {
    this.http.post<User>(server.serverUrl + 'users/updateUser', this.currentUser).subscribe(data => {
      this.currentUser = data;
    });
  }

  onAddresses(addresses: Address[]) {
    this.currentUser.address = addresses;
  }

}
