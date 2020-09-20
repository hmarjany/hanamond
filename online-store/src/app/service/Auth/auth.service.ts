import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/model/User';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserEnvelop } from 'src/app/model/UserEnvelop';
import { server } from 'src/app/Helper/server';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(user: User) {
    return this.http.post<UserEnvelop>(server.serverUrl + 'users/login', user)
      .pipe(map(res => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('currentUser', JSON.stringify(res.user));
        this.currentUserSubject.next(res.user);
        console.log(res.user);
        return res;
      }));
  }

  register(user: User) {
    return this.http.post<User>(server.serverUrl + 'users', user);
  }

  logout() {
    this.http.post<User>(server.serverUrl + 'users/me/logout', this.currentUserSubject.value)
      .subscribe(
        data => {

        },
        error => {
          console.log(error);
        },
        () => {

        }
      );

    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.currentUser = this.currentUserSubject.asObservable();

  }

}