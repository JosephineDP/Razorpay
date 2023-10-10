import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };


@Injectable({
  providedIn: 'root'
})
export class PaymentDetailsService {
  register() {
    throw new Error('Method not implemented.');
  }
	private baseUrl = 'http://localhost:8080/pg'; // Replace with your Spring Boot API URL

	constructor(private http: HttpClient) {}
  
	createOrder(orderRequest: any): Observable<any> {
	  const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
	  return this.http.post(`${this.baseUrl}/createOrder`, orderRequest, { headers });
	}
}
