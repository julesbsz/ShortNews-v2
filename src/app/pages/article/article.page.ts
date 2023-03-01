import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Browser } from '@capacitor/browser';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-article',
  templateUrl: './article.page.html',
  styleUrls: ['./article.page.scss'],
})
export class ArticlePage implements OnInit {
  data: any;
  constructor(private router: Router, private navController: NavController) {}

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
}
