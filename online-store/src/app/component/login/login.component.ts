import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/service/Auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/model/User';
import { DataService } from 'src/app/service/Data/data.service';
import { ErrorObject } from 'src/app/Helper/ErrorObject';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form:FormGroup;
  errorObject: ErrorObject = new ErrorObject();
  returnUrl: string = '';
  showMenu = false;
  constructor(private fb:FormBuilder, 
               private authService: AuthService, 
               private router: Router,
               private dataService: DataService,
               private route: ActivatedRoute) {

      this.form = this.fb.group({
          username: ['',Validators.required],
          password: ['',Validators.required]
      });
      
  }

  ngOnInit(): void {
    this.dataService.sendData("false");

    this.route.queryParams.subscribe(params => {
      this.returnUrl = params['returnUrl'];
  });
  }

  ngOnDestroy(){
    this.dataService.clearData();
  }

  login() {
      const val = this.form.value;
      var user = new User();
      
      user.email = val.username;
      user.password = val.password;

      if (val.username && val.password) {
          this.authService.login(user)
              .subscribe(
                  data => {
                    console.log(data);
                    if(this.returnUrl != undefined){
                      this.router.navigateByUrl(this.returnUrl);
                    }else{
                      this.router.navigateByUrl('/home');
                    }
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