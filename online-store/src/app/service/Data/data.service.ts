import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
 
@Injectable({
    providedIn: 'root' 
})
export class DataService {
    public subject = new Subject<any>();
 
    sendData(message: string) {
        this.subject.next(message);
    }
 
    clearData() {
        this.subject.next();
    }
 
    getData(): Observable<any> {
        return this.subject.asObservable();
    }
}