import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Browser } from '@capacitor/browser';
import { Share } from '@capacitor/share';
import { NavController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-article',
  templateUrl: './article.page.html',
  styleUrls: ['./article.page.scss'],
})
export class ArticlePage implements OnInit {
  data: any;
  constructor(
    private router: Router,
    private navController: NavController,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    const routerState = this.router.getCurrentNavigation()?.extras.state;

    if (!routerState) {
      this.navigateForward();
    } else {
      // console.log(routerState['article']);
      this.data = { ...routerState['article'] };
      console.log(this.data);
      // for (const key in data) {
      //   console.log(`${key}: ${data[key]}`);
      // }
    }
  }

  navigateForward() {
    this.navController.setDirection('back');
    this.router.navigate(['/']);
  }

  async openBrowser() {
    await Browser.open({ url: this.data.url });
  }

  async shareArticle() {
    const result = await Share.canShare();
    if (result.value) {
      await Share.share({
        title: this.data.title,
        text: this.data.description,
        url: this.data.url,
        dialogTitle: 'Share the article',
      });
    } else {
      this.presentToast();
    }
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Oops, unable to share article :/',
      duration: 1500,
      position: 'bottom',
      color: 'danger',
    });

    await toast.present();
  }
}
