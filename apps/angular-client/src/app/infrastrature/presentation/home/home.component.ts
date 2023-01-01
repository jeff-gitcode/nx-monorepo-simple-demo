import { Component, OnInit } from '@angular/core';
import { IAuthService } from '../../../application/interface/spi/iauth.service';

@Component({
  selector: 'nx-monorepo-demo-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(private authenticationService: IAuthService) {}

  ngOnInit(): void {}

  logout(): void {
    this.authenticationService.logout();
  }
}
