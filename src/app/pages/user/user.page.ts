import { Component, OnInit } from '@angular/core';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {
  userInfo = null;
  constructor() {}

  ngOnInit() {
    GoogleAuth.initialize();
  }

  async loginWithGoogle() {
    const googleUser = await GoogleAuth.signIn();
    console.log(googleUser);
  }
}
