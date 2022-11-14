import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { provideMockStore } from '@ngrx/store/testing';
import { Store } from '@ngrx/store';
import { By } from '@angular/platform-browser';
import { mockedUser } from '../../mocks/user-mock';
import { ProfileComponent } from './profile.component';

describe('ProfileComponent', () => {
  let fixture: ComponentFixture<ProfileComponent>;
  let component: ProfileComponent;
  let store: Store;
  let service: AuthService;
  const initialState = { loggedIn: false };
  let debugElement: DebugElement;
  let currentUser = mockedUser;

  let router: Router;
  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      declarations: [ProfileComponent],
      providers: [provideMockStore({ initialState }), AuthService],
      imports: [HttpClientTestingModule],
      schemas: [NO_ERRORS_SCHEMA],
    }).createComponent(ProfileComponent);
    component = fixture.componentInstance;
    store = TestBed.inject<Store>(Store);
    debugElement = fixture.debugElement;
    service = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
    component.user = currentUser;
    fixture.detectChanges();
  });
  it('should create profile component', () => {
    expect(component).toBeTruthy();
  });
});
