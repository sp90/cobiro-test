import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { CustomerInterface } from '../interfaces/customer';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  registerCustomer: FormGroup;
  countries: any;
  isLoading: boolean = false;

  constructor(private fb: FormBuilder, private Auth: AuthService, private http: HttpClient, private router: Router) { }

  ngOnInit() {
    this.registerCustomer = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      first_name: ['', [Validators.required, Validators.minLength(2)]],
      last_name: ['', [Validators.required, Validators.minLength(2)]],
      country_code: [null, [Validators.required, Validators.minLength(2)]],
    });
    
    this.getCountries()
  }

  // Bind countries to the view
  getCountries() {
    this.http.get<any>('https://api.test-cobiro.com/api/v1/country')
      .subscribe(data => {
        this.countries = data.countries
      })
  }

  submit() {
    console.log(this.registerCustomer.value);
    this.isLoading = true;

    this.Auth.newCustomer(this.registerCustomer.value)
      .subscribe((data: any) => {
        if (data && data.status === 'success') {
          // Login
          this.login(this.registerCustomer.value)
        }
      })
  } 

  login(loginObj: CustomerInterface) {
    this.Auth.login(loginObj)
      .subscribe((data: any) => {
        // Bind to localstorage
        if (data && data.access_token && data.customer) {
          localStorage.setItem('cobiroToken', data.access_token)
          localStorage.setItem('cobiroUser', JSON.stringify(data.customer))
        }

        // Validate that the user is authenticated 
        //  - This could be used to safeguard routes
        //  - And good for testing
        // console.log(this.Auth.isAuthenticated())

        // Redirect to dashboard
        this.router.navigate(['/dashboard'])

        this.isLoading = false;
      })
  }
}
