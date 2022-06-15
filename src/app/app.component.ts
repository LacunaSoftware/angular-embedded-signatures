import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-signer-example';

  constructor(private route: ActivatedRoute,
    private router: Router) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => {
      return false;
    };
  }

  refreshPage() {
    this.router.navigateByUrl('');
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      console.log(params['name']);
    });
  }
}
