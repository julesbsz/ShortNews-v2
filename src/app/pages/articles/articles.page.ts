import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
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
    private loadingController: LoadingController
  ) {}

  ngOnInit() {
    this.loadArticles();
  }

  async loadArticles() {
    const loading = await this.loadingController.create({
      spinner: 'circles',
    });
    await loading.present();

    this.articlesService.getLatestNews().subscribe((res) => {
      let data = Object.values(res)[2];
      loading.dismiss();
      this.articles = [...this.articles, ...data];
      console.log(this.articles);
    });
  }
}
