import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { GooglePlus } from '@ionic-native/google-plus/ngx';

export interface AccountData {
  email: any,      // 'eddyverbruggen@gmail.com'
  userId: any,         // user id
  displayName: any,    // 'Eddy Verbruggen'
  familyName: any,     // 'Verbruggen'
  givenName: any,      // 'Eddy'
  imageUrl: any,       // 'http://link-to-my-profilepic.google.com'
  idToken: any,        // idToken that can be exchanged to verify user identity.
  serverAuthCode: any, // Auth code that can be exchanged for an access token and refresh token for offline access
  accessToken: any,    // OAuth2 access token
}
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  data: AccountData;

  constructor(private platform: Platform,private googlePlus: GooglePlus) {
    
    this.trySilentLogin();

  }

  trySilentLogin(){
    this.platform.ready().then(()=>{
      this.googlePlus.trySilentLogin(
        {
          'scopes': '... ', // optional - space-separated list of scopes, If not included or empty, defaults to `profile` and `email`.
          'webClientId': 'client id of the web app/server side', // optional - clientId of your Web application from Credentials settings of your project - On Android, this MUST be included to get an idToken. On iOS, it is not required.
          'offline': true, // Optional, but requires the webClientId - if set to true the plugin will also return a serverAuthCode, which can be used to grant offline access to a non-Google server
        }).then(res => {
          this.data = res;
        }).catch(err => {
          alert('error: ' + err);
        }
      );
    });
  }
  googleLogin(){
    console.log(1);
    this.googlePlus.login({})
    .then(res => {
      
      this.data = res;
    } )
    .catch(err => 
      alert(err.toString())
    );
  }
  googleLogout(){
    this.googlePlus.logout().then((msg)=>{
      this.data = null;
      alert(msg);
    });
  }
  disconnect(){
    this.googlePlus.disconnect().then((msg)=>{
      this.data = null;
      alert(msg);
    });
  }
}
