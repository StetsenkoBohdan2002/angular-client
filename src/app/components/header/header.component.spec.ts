import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ClickedOutsideDirective } from './dropdown.directive';
import { HeaderComponent } from './header.component';
import { provideMockStore } from '@ngrx/store/testing';
import { Store } from '@ngrx/store';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { mockedUser } from '../../mocks/user-mock';

describe('HeaderComponent', () => {
  let fixture: ComponentFixture<HeaderComponent>;
  let component: HeaderComponent;
  let store: Store;
  let service: AuthService;
  const initialState = { test: false };
  let debugElement: DebugElement;
  let currentUser = mockedUser;

  let router: Router;
  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      declarations: [HeaderComponent, ClickedOutsideDirective],
      providers: [
        provideMockStore({ initialState }),
        AuthService,
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get(): string {
                  return '123';
                },
              },
            },
          },
        },
      ],
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      schemas: [NO_ERRORS_SCHEMA],
    }).createComponent(HeaderComponent);
    component = fixture.componentInstance;
    store = TestBed.inject<Store>(Store);
    debugElement = fixture.debugElement;
    service = TestBed.inject(AuthService);
    router = TestBed.inject(Router);

    fixture.detectChanges();
  });
  it('should create header component', () => {
    expect(component).toBeTruthy();
  });
  it('should check clickOutside directive', () => {
    component.checkLogin = true;
    component.user = currentUser;
    fixture.detectChanges();
    const profileImg = debugElement.query(By.css('.profile-img'));
    profileImg.triggerEventHandler('click');
    fixture.detectChanges();
    expect(component.showModal).toBeTrue();
    expect(fixture.nativeElement.querySelector('.profile-modal')).toBeTruthy();
    component.showModal = false;
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.profile-modal')).toBeNull();
  });
  it('should check status of router url and navigate to register or login page', () => {
    const navigateSpy = spyOn(router, 'navigate');
    component.checkStatus();
    expect(navigateSpy).toHaveBeenCalledWith(['api/register']);
    expect(component.btnTitle).toBe('Login');
    spyOnProperty(router, 'url', 'get').and.returnValue('/api/register');
    component.checkStatus();
    expect(navigateSpy).toHaveBeenCalledWith(['api/login']);
    expect(component.btnTitle).toBe('Register');
  });
  it('should change showModal to opposite', () => {
    component.onShowModal();
    expect(component.showModal).toBeTrue();
    component.onShowModal();
    expect(component.showModal).toBeFalse();
  });
  it('should logout', () => {
    component.user = currentUser;
    component.checkLogin = true;
    const navigateSpy = spyOn(router, 'navigate');
    const serviceSpy = spyOn(service, 'authLogout');

    component.logout();
    expect(navigateSpy).toHaveBeenCalledWith(['api/login']);
    expect(serviceSpy).toHaveBeenCalled();
    expect(component.showModal).toBeFalse();
  });
  it('should call checkStatus after click on the button', () => {
    const button = debugElement.query(By.css('app-button'));
    const checkStatusSpy = spyOn(component, 'checkStatus');
    button.nativeElement.click();
    expect(checkStatusSpy).toHaveBeenCalled()
  });
  it('should call onShowModal after click on the button', () => {
    component.checkLogin = true;
    component.user = currentUser;
    const onShowModalSpy = spyOn(component, 'onShowModal');
    fixture.detectChanges();
    const profileImg = debugElement.query(By.css('.profile-img'));
    profileImg.triggerEventHandler('click');
    expect(onShowModalSpy).toHaveBeenCalled()
  });
});
