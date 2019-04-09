import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StartComponent } from './start.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JwtModule } from '@auth0/angular-jwt';
import { RouterTestingModule } from '@angular/router/testing';

import { CustomerInterface } from '../interfaces/customer';
import { DebugElement } from '@angular/core';

export function tokenGetter() {
  return localStorage.getItem('access_token')
}

describe('StartComponent', () => {
  let component: StartComponent;
  let fixture: ComponentFixture<StartComponent>;
  let submitEl: DebugElement;
  let emailEl: DebugElement;
  let passwordEl: DebugElement;

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
      declarations: [ StartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    const compiled = fixture.debugElement.nativeElement;

    submitEl = compiled.querySelector(('button'));
    emailEl = compiled.querySelector(('input[type=email]'));
    passwordEl = compiled.querySelector(('input[type=password]'));
  });

  it('should create start component', () => {
    expect(component).toBeTruthy();
  });

  it('should have welcome back title', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Welcome back');
  });

  it('should login when inputs are filled', () => {
    emailEl.value = "test@example.com";
    passwordEl.value = "123456";

    expect(component.isLoading).toBeFalsy()

    // Login
    component.login()

    expect(component.isLoading).toBeTruthy()
  });
});
