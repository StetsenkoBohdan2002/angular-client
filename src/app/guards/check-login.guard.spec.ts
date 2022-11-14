import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import {
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
  Router,
} from '@angular/router';
import { AuthService } from '../services/auth.service';

import { CheckLoginGuard } from './check-login.guard';
function fakeRouterState(url: string): RouterStateSnapshot {
  return {
    url,
  } as RouterStateSnapshot;
}
describe('CheckLoginGuard', () => {
  let guard: CheckLoginGuard;
  let service: AuthService;
  let routerSpy = { navigate: jasmine.createSpy('navigate') };
  const dummyRoute = {} as ActivatedRouteSnapshot;
  const fakeUrls = ['/api'];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService, { provide: Router, useValue: routerSpy }],
    });
    guard = TestBed.inject(CheckLoginGuard);
    service = TestBed.inject(AuthService);
  });
  fakeUrls.forEach((fakeUrl) => {
    it('should check whether the user is authorized and return false', () => {
      service.isLoggedIn();
      const isAccessGranted = guard.canActivate(
        dummyRoute,
        fakeRouterState(fakeUrl)
      );
      expect(routerSpy.navigate).toHaveBeenCalledWith(['home']);
      expect(isAccessGranted).toBeFalse();
    });
    it('should check whether the user is authorized, navigate to login and return false', () => {
      const isAccessGranted = guard.canActivate(
        dummyRoute,
        fakeRouterState(fakeUrl)
      );
      expect(isAccessGranted).toBeTrue();
    });
  });
});
