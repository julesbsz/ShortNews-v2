import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, NavController } from '@ionic/angular';
import { ArticlesService } from 'src/app/services/articles/articles.service';

@Component({
  selector: 'app-Articles',
  templateUrl: './Articles.page.html',
  styleUrls: ['./Articles.page.scss'],
})
export class ArticlesPage implements OnInit {
  articles: any[] = [];

  constructor(
    private articlesService: ArticlesService,
    private loadingController: LoadingController,
    private router: Router,
    private navController: NavController
  ) {}

  ngOnInit() {
    this.loadArticles('');
  }

  navigate(location: string) {
    if (location === 'user') {
      this.navController.setDirection('back');
    } else {
      this.navController.setDirection('forward');
    }
    this.router.navigate([`/${location}`]);
  }

  async loadArticles(content: string) {
    // if (content === '') {
    //   const loading = await this.loadingController.create({
    //     spinner: 'circles',
    //     cssClass: 'custom-loading',
    //   });
    //   await loading.present();
    //   this.articlesService.getLatestNews().subscribe((res) => {
    //     let data = Object.values(res)[2];
    //     loading.dismiss();
    //     this.articles = [...data];
    //   });
    // } else {
    //   this.articlesService.getSearchingNews(content).subscribe((res) => {
    //     let data = Object.values(res)[2];
    //     this.articles = [...data];
    //   });
    // }
  }

  searching(event: any) {
    let value = event.detail.value;
    this.loadArticles(value);
  }
}
