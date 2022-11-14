import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  getAuthData,
  getLoading,
} from 'src/app/store/auth-store/store/auth.selectors';
import {
  logout,
} from 'src/app/store/auth-store/store/auth.actions';
import { User } from 'src/app/models/user.model';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  checkLogin!: boolean;
  btnTitle: string = 'Register';
  loading$: Observable<boolean> = this.store$.pipe(select(getLoading));
  showModal: boolean = false;
  user!: User;
  constructor(
    private authService: AuthService,
    private router: Router,
    private store$: Store
  ) {}

  ngOnInit(): void {
    this.authService.isLoggedInUser.subscribe((value) => {
      if (value) {
        this.store$.pipe(select(getAuthData)).subscribe((value) => {
          if (value) {
            console.log(value)
            this.user = value;
          }
        });
      }
      return (this.checkLogin = value);
    });
  }
  checkStatus() {
    if (this.router.url === '/' || this.router.url === '/api/login') {
      this.router.navigate(['api/register']);
      this.btnTitle = 'Login';
    } else if (this.router.url === '/api/register') {
      this.router.navigate(['api/login']);
      this.btnTitle = 'Register';
    }
  }
  logout() {
    localStorage.removeItem('user-info');
    localStorage.removeItem('boards');
    this.store$.dispatch(logout());
    this.authService.authLogout();
    this.router.navigate(['api/login']);
    this.showModal = false;
  }
  onShowModal() {
    this.showModal = !this.showModal;
  }
}
