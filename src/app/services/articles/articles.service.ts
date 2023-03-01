import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ArticlesService {
  constructor(private http: HttpClient) {}

  getLatestNews() {
    return this.http.get(
      `https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=${environment.news.key}`
    );
  }

  getSearchingNews(content: string) {
    return this.http.get(
      `https://newsapi.org/v2/everything?q=${content}&apiKey=${environment.news.key}`
    );
  }
}
