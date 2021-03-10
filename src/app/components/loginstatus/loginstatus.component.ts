import { Component, OnInit } from '@angular/core';
import { OktaAuthService } from '@okta/okta-angular';

@Component({
  selector: 'app-loginstatus',
  templateUrl: './loginstatus.component.html',
  styleUrls: ['./loginstatus.component.css'],
})
export class LoginstatusComponent implements OnInit {
  isAuthenticated: boolean = false;
  userFullName: string;
  constructor(private oktaAuthService: OktaAuthService) {}

  ngOnInit(): void {
    //Subscribe to authentication state changes
    this.oktaAuthService.$authenticationState.subscribe((result) => {
      this.isAuthenticated = result;
      this.getUserDetails();
    });
  }
  getUserDetails() {
    if (this.isAuthenticated) {
      //Fetch the logged inuser details

      // user full name is exposed as a property name

      this.oktaAuthService.getUser().then((res) => {
        this.userFullName = res.name;
      });
    }
  }
  logout() {
    //Terminates the session with Okta and removes current tokens

    this.oktaAuthService.signOut();
  }
}
