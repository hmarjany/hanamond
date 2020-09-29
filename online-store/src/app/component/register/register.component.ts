import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/service/Auth/auth.service';
import { Router } from '@angular/router';
import { User } from 'src/app/model/User';
import { ErrorStateMatcher } from 'src/app/ErrorStateMatcher';
import { DataService } from 'src/app/service/Data/data.service';
import { ErrorObject } from 'src/app/Helper/ErrorObject';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  matcher = new ErrorStateMatcher();
  showMenu = false;
  errorObject: ErrorObject = new ErrorObject();
  
  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private dataService: DataService) {

    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.email,Validators.required]],
      phone: ['', [Validators.required, Validators.pattern("[0-9 ]{10}")]],
      password: ['', [Validators.required, Validators.min(6)]],
      confirmPass: ['']
    }, { validator:[ this.checkPasswords, this.checkPasswordsLength] });
  }

  checkPasswords(group: FormGroup) {
    if (group == null) {
      return;
    }

    let pass = group.get('password').value;
    let confirmPass = group.get('confirmPass').value;
    
    return pass === confirmPass ? null : { notSame: true }
  }

  checkPasswordsLength(group: FormGroup) {
    if (group == null) {
      return;
    }

    let pass = group.get('password').value as string;
    
    
     if(pass.length < 6){
      return {passLength:true};
     } 

     return {passLength:false};
  }

  ngOnInit(): void {
    this.dataService.sendData("false");
  }

  ngOnDestroy(){
    this.dataService.clearData();
  }

  register() {
    const val = this.form.value;
    var user = new User();

    user.email = val.email;
    user.name = val.name;
    user.password = val.password;
    user.phoneNumber = val.phone;

    if (val.email && val.password) {
      this.authService.register(user)
        .subscribe(
          data => {
            console.log(data);
            this.router.navigateByUrl('/home');
            this.authService.login(user).subscribe(
              data => {
                console.log(data);
              },
              error => {
                this.errorObject.Message=error;
              },
              () => {

              }
          );
          },
          error => {
            this.errorObject.Message=error;
          },
          () => {

          }
        );
    }
  }
}
