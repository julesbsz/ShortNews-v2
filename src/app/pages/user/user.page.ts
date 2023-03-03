import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { Router } from '@angular/router';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
import {
  AlertController,
  LoadingController,
  NavController,
} from '@ionic/angular';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {
  @ViewChild(IonModal) modal!: IonModal;
  user: any = null;
  credentials!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private authService: AuthService,
    private router: Router,
    private navController: NavController
  ) {}

  // Access Form Fields
  get email() {
    return this.credentials.get('email');
  }

  get password() {
    return this.credentials.get('password');
  }

  ngOnInit() {
    GoogleAuth.initialize();

    this.credentials = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  async loginWithGoogle() {
    this.user = await GoogleAuth.signIn();
    console.log(this.user);
  }

  async register() {
    const loading = await this.loadingController.create();
    await loading.present();

    this.user = await this.authService.register(this.credentials.value);

    await loading.dismiss();

    if (this.user) {
      //got user !
    } else {
      this.showAlert('Registration Failed', 'Please try again!');
    }
  }

  async login() {
    const loading = await this.loadingController.create({
      spinner: 'circles',
      cssClass: 'custom-loading',
    });
    await loading.present();

    this.user = await this.authService.login(this.credentials.value);

    await loading.dismiss();

    if (this.user) {
      //got user !
    } else {
      this.showAlert('Login Failed', 'Please try again!');
    }
  }

  logout() {
    this.authService.logout();
    GoogleAuth.signOut();
    this.user = null;
  }

  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      cssClass: 'customAlert',
      header,
      message,
      buttons: ['OK'],
    });
    await alert.present();
  }

  navigateForward() {
    this.navController.setDirection('forward');
    this.router.navigate(['/']);
  }

  // modal controls
  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      console.log('modal closed');
    }
  }
}
