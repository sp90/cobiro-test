
import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { CustomerInterface } from '../interfaces/customer';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  readonly ROOT_URL = 'https://api.test-cobiro.com/api/v1'

  constructor(private http: HttpClient) { }

  newUser(customer: CustomerInterface): Observable<CustomerInterface> {
    return this.http.post<CustomerInterface>(this.ROOT_URL + '/register', customer)
      .pipe(
        catchError(this.handleError)
      )
  }

  // Error handling 
  handleError(error) {
    let errorMessage = ''

    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`
    }

    window.alert(errorMessage)

    return throwError(errorMessage)
  }
}