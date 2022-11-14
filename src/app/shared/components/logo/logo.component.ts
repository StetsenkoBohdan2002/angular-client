import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.scss'],
})
export class LogoComponent implements OnInit {
  logoTitle: string = 'stets_do';
  logoLeftPart: string = '<';
  logoRightPart: string = '/>';

  constructor() {}

  ngOnInit(): void {}
}
