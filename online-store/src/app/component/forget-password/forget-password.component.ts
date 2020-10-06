import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/service/Auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/model/User';
import { DataService } from 'src/app/service/Data/data.service';
import { ErrorObject } from 'src/app/Helper/ErrorObject';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent implements OnInit {
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
          username: ['', [Validators.email,Validators.required]]
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

  reset() {
      const val = this.form.value;
      var user = new User();
      
      user.email = val.username;

      if (val.username) {
          this.authService.resetPasword(user)
              .subscribe(
                  data => {
                    console.log(data);
                    if(this.returnUrl != undefined){
                      this.router.navigateByUrl('/home');
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