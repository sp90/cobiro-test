import { TestBed, fakeAsync } from '@angular/core/testing';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { JwtModule } from '@auth0/angular-jwt';

import { AuthService } from './auth.service';
import { CustomerInterface } from '../interfaces/customer';
import { of } from 'rxjs';

export function tokenGetter() {
  return localStorage.getItem('access_token')
}

const MockAuthService = {
  provide: AuthService,
  useValue: {
    isAuthenticated: () => {
      const token = localStorage.getItem('cobiroToken');

      return token;
    },
    newCustomer: (customer: CustomerInterface) => {
      return of(customer);
    },
    login: (customer: any) => {
      if (customer.email === 'work@nomis.dk' && customer.password === 'testtest') {
        let loginObj: any = {
          "token_type": "Bearer",
          "expires_in": 2591999,
          "access_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImNlMjZkNjY1OGY3NDMyOGMzYjMxNGUyMWViYjZkMmM4YzZmNGQ4ODRjNmJlNzA0NmYxODk2ODI3MmYzNDgzZGE2OTg1YWM2ZWEyODIyYjlhIn0.eyJhdWQiOiIzIiwianRpIjoiY2UyNmQ2NjU4Zjc0MzI4YzNiMzE0ZTIxZWJiNmQyYzhjNmY0ZDg4NGM2YmU3MDQ2ZjE4OTY4MjcyZjM0ODNkYTY5ODVhYzZlYTI4MjJiOWEiLCJpYXQiOjE1NTQ4MDcxNTAsIm5iZiI6MTU1NDgwNzE1MCwiZXhwIjoxNTU3Mzk5MTQ5LCJzdWIiOiIzNDMxIiwic2NvcGVzIjpbXX0.jx3FODBD2V5KBaz5yExL_Y87ktj0yg1nRHU14RqbjXfD_MvQJpTj2nROFo-fPEzNrRFs78zPzskmcG5Ua9SOl2tgH4pD_2MfP0F2OSPOXcZkTsc76HXF7Rd7GlTG2xWlYyYhqrK_bkhm-GzeRy68umtbGrg6Yhk9uAA8bjdGpMJ2yrxUlXhCQayiMJdYigF_F9Q9AyFe3BL0nRz43OeOtPGRsySrCTjK3YYTdumWDHoauTeSX9xvvcDhe6cYYJ-P0trOsYRM1toYyQbFMTSLxhrqdc7S-xPMN2-TTTWqjQj6IDv_9Ut8bTSbVXcUe5DbGMW2mz7s-qNnItICdGNp9w52v4uFORZA37vnHxxROX6y43INOPEbJ6YinKKNQGo5HvXkty0FvlOkqRh0lv1T3JmQq4rohXCIc9Rs8RfNrT_x4uDV4_aqAGrFY1_Bvk8Yc_oddaVM-7rWS_EFeg7KStW-htxy5uQcmloVaepU3wNfMVeLa0LUMt-30ZumtJZygyy2WY0Y_Jl5vfRYntYQ3N4VP9XWNJbnZbH1Tzcbpw3EYpc5dIfnxDJZYtrIhXoJ5W95gFXqCoarrumWyaGIvzIL4-ZkDNpD7CMzt6mrL7W9RXp2rQNiz4ldJDfm9Ey3HIYLURBhoMFb6Cw0tAsac9NkBNda6MsJYtkdsiN8je0",
          "refresh_token": "def50200a44096a810e2f9b19b489043442f8556342c3745c0fb5922c4210b015ae8aa624185c9396fdc9ad5d9bfef59f3fa99452e1954b5e3f010a4eb770a9321d57f9f7401c23c86013a6e2d65ee9c3532d0ca6287735a55073e9a6027697255a6da8ba46aa68fd7a7f9ed8eaaf9ca0b55948fd22007947e9a5ac48afc520e2561bc570fee72d31234d7347b3675618f2626c928a91f206f5beb5eb5395c43a4c5b38492fa7234b0420e672b20f707f7ed1931c3315939d4afa123358148a661009858b4cd4a5c62cbcd26a26be1d52c0348188fb7ae83dac933905a092d3b9a93c2875968b82374a5756740c45af706e60ec166da08b8081fa7c385a109ba35072ef3a3abe0b3c750fff8bf988d6f0b3b49b0ba0f7ebc59593cf659cc46f72a9b818c058d5d2c2ac2997d76473557426b993228d9cc09367b0f6925771b089eb8164a14aa98568a6cfc20c5c5e5765adc0b7e28cb9ff5669d909e05ada80299dd85a7",
          "customer": {
            "id": 3431,
            "company_id": 3375,
            "active": true,
            "email": "work@nomis.dk",
            "group": "user",
            "first_name": "Simon",
            "last_name": "Dragsb\u00e6k",
            "weekly_summary": true,
            "created_at": "2019-04-09T07:26:24+00:00",
            "updated_at": "2019-04-09T07:26:24+00:00",
            "source": "",
            "vat_number": null,
            "card_number": null,
            "google_accounts": []
          }
        }

        return of(loginObj)
      } else {
        return of({})
      }
    }
  }
};

describe('AuthService', () => {
  // We declare the variables that we'll use for the Test Controller and for our Service
  let httpTestingController: HttpTestingController;
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MockAuthService],
      imports: [
        HttpClientTestingModule,
        JwtModule.forRoot({
          config: {
            tokenGetter: tokenGetter,
            whitelistedDomains: [],
            blacklistedRoutes: []
          }
        })
      ] 
    });

    // We inject our service (which imports the HttpClient) and the Test Controller
    httpTestingController = TestBed.get(HttpTestingController);
    service = TestBed.get(AuthService);
  });

  it('should be created', () => {
    const service: AuthService = TestBed.get(AuthService);
    
    expect(service).toBeTruthy();
  });

  it('should login and be authed and token has been set', () => {
    service.login({
      email: 'work@nomis.dk',
      password: 'testtest'
    })
    .subscribe(data => {
      console.log(service.isAuthenticated());
      
      expect(service.isAuthenticated()).toBeFalsy()

      if (data && data.access_token && data.customer) {
        localStorage.setItem('cobiroToken', data.access_token)
        localStorage.setItem('cobiroUser', JSON.stringify(data.customer))
      }

      expect(service.isAuthenticated()).toBeTruthy()

      expect(data.customer.email).toEqual('work@nomis.dk')
    })
  })

  it('should create new customer', () => {
    service.newCustomer({
      email: 'work@nomis.dk',
      password: 'testtest',
      first_name: 'my new name',
      last_name: 'get my name',
      country_code: 'DK',
    })
    .subscribe(data => {
      // I know this is kinda tidious but its hard to say how you would test your services with mocks like this
      // some dont test their simple services 
      // But i went for making it in a redundant way because my service is so simple
      expect(data).toEqual({
        email: 'work@nomis.dk',
        password: 'testtest',
        first_name: 'my new name',
        last_name: 'get my name',
        country_code: 'DK',
      })
    })
  })

  afterEach(() => {
    localStorage.clear()
  })
});
