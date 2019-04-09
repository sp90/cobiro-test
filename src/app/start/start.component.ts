import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

//import { CustomerInterface } from '../interfaces/customer';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss']
})
export class StartComponent implements OnInit {
  loginCustomer: FormGroup;
  isLoading: boolean = false;

  constructor(private fb: FormBuilder, private Auth: AuthService, private router: Router) {}

  ngOnInit() {
    this.loginCustomer = this.fb.group({
      email: ['work@nomis.dk', [Validators.required, Validators.email]],
      password: ['testtest', [Validators.required, Validators.minLength(2)]]
    });
  }

  login() {
    this.isLoading = true;
    
    this.Auth.login(this.loginCustomer.value)
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