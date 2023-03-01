import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-article',
  templateUrl: './article.page.html',
  styleUrls: ['./article.page.scss'],
})
export class ArticlePage implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {
    const routerState = this.router.getCurrentNavigation()?.extras.state;
    console.log(routerState);
  }
}
