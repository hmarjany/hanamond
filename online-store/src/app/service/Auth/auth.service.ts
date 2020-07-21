import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/model/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) {
  }
    
  login(user: User) {
    return this.http.post<User>('http://127.0.0.1:3100/users/login',user);
  }

  register(user: User){
    return this.http.post<User>('http://127.0.0.1:3100/users',user);
  }
}