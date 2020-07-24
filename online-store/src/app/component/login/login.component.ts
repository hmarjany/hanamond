import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/service/Auth/auth.service';
import { Router } from '@angular/router';
import { User } from 'src/app/model/User';
import { DataService } from 'src/app/service/Data/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form:FormGroup;

  showMenu = false;
  constructor(private fb:FormBuilder, 
               private authService: AuthService, 
               private router: Router,
               private dataService: DataService) {

      this.form = this.fb.group({
          username: ['',Validators.required],
          password: ['',Validators.required]
      });
      
  }

  ngOnInit(): void {
    this.dataService.sendData("false");
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
                    this.router.navigateByUrl('/');
                  },
                  error => {
                    console.log(error);
                  },
                  () => {

                  }
              );
      }
  }

}