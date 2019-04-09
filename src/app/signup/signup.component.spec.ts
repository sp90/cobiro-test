import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupComponent } from './signup.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { JwtModule } from '@auth0/angular-jwt';

export function tokenGetter() {
  return localStorage.getItem('access_token')
}

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule,
        JwtModule.forRoot({
          config: {
            tokenGetter: tokenGetter,
            whitelistedDomains: [],
            blacklistedRoutes: []
          }
        })
      ],
      declarations: [ SignupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    component.testing = true;
  });

  it('should create signup component', () => {
    expect(component).toBeTruthy();
  });

  it('should have welcome back title', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Sign up for Cobiro today');
  });

  it('should signup by filling inputs and sending it off to the server', () => {
    const compiled = fixture.debugElement.nativeElement;

    let emailEl = compiled.querySelector(('.signup__email'));
    let passwordEl = compiled.querySelector(('.signup__password'));
    let firstNameEl = compiled.querySelector(('.signup__first-name'));
    let lastNameEl = compiled.querySelector(('.signup__last-name'));
    let countryCodeEl = compiled.querySelector(('.signup__country-code'));

    emailEl.value = 'work@nomis.dk';
    passwordEl.value = 'testtest';
    firstNameEl.value = 'Jens';
    lastNameEl.value = 'Tester';
    countryCodeEl.value = 'DK'

    // In doubt about how you stub the services have been troubling around with this for a while now
  });
});
