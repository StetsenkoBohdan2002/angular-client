import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { getAuthData } from 'src/app/store/auth-store/store/auth.selectors';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  styles: [
    `
      :host {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    `,
  ],
})
export class ProfileComponent implements OnInit {
  user!: User;
  constructor(private authService: AuthService, private store$: Store) {}
  ngOnInit(): void {
    this.authService.isLoggedInUser.subscribe((value: boolean) => {
      if (value) {
        this.store$.pipe(select(getAuthData)).subscribe((value) => {
          if (value) {
            this.user = value;
          }
        });
      }
    });
  }
}
