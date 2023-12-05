import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  loginCall() {
    this.http.get('/api').subscribe((data) => {
      console.log('data', data);
    });
  }

}
