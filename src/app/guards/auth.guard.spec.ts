import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import {
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
  Router,
} from '@angular/router';
import { AuthService } from '../services/auth.service';

import { AuthGuard } from './auth.guard';
function fakeRouterState(url: string): RouterStateSnapshot {
  return {
    url,
  } as RouterStateSnapshot;
}
describe('AuthGuard', () => {
  let guard: AuthGuard;
  let service: AuthService;
  let routerSpy = { navigate: jasmine.createSpy('navigate') };
  const dummyRoute = {} as ActivatedRouteSnapshot;
  const fakeUrls = ['/boards','/comments/:id','/tasks/:id','/profile'];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService, { provide: Router, useValue: routerSpy }],
    });
    guard = TestBed.inject(AuthGuard);
    service = TestBed.inject(AuthService);
  });
  fakeUrls.forEach((fakeUrl) => {
    it('should check whether the user is authorized and return true', () => {
      service.isLoggedIn();

      const isAccessGranted = guard.canActivate(
        dummyRoute,
        fakeRouterState(fakeUrl)
      );
      expect(isAccessGranted).toBeTrue();
    });
    it('should check whether the user is authorized, navigate to login and return false', () => {
      const isAccessGranted = guard.canActivate(
        dummyRoute,
        fakeRouterState(fakeUrl)
      );
      expect(routerSpy.navigate).toHaveBeenCalledWith(['api/login']);
      expect(isAccessGranted).toBeFalse();
    });
  });
});
