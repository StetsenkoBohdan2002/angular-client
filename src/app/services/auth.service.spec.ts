import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { FormControl, FormGroup } from '@angular/forms';
import { Answer } from '../models/request.model';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService],
    });
    service = TestBed.inject(AuthService);
    httpController = TestBed.inject(HttpTestingController);
  });
  afterEach(() => {
    httpController.verify();
  });
  it('the user should log in and change the variable values to true', () => {
    service.isLoggedIn();
    expect(service.checkLogin).toBeTruthy();
    service.isLoggedInUser.subscribe((res) => {
      expect(res).toBeTruthy();
    });
  });
  it('the user should log out and change the variable values to false', () => {
    service.authLogout();
    expect(service.checkLogin).toBeFalsy();
    service.isLoggedInUser.subscribe((res) => {
      expect(res).toBeFalsy();
    });
  });
  it('should register new user and get answer from server', (done) => {
    const mockedAnswerValue = {
      message: 'Profile created successfully!',
      status: 200,
    };
    const mockedRequestValue: FormGroup = new FormGroup({
      firstName: new FormControl('John'),
      lastName: new FormControl('Salivan'),
      email: new FormControl('john.2000@gmail.com'),
      password: new FormControl('john1234575224'),
      confirmPassword: new FormControl('john1234575224'),
    });
    const request = service.registerNewUser(mockedRequestValue);
    request.subscribe((res: Answer) => {
      expect(res).toEqual(mockedAnswerValue);
      done();
    });
    const testRequest = httpController.expectOne({
      method: 'POST',
      url: 'http://localhost:8080/api/auth/register',
    });
    testRequest.flush(mockedAnswerValue);
  });

  it('should login user and get answer from server', (done) => {
    const mockedAnswerValue = {
      message: 'Success!',
      status: 200,
      result: 'OK',
      accessToken: 'reJfeflkefrr555mfef35535',
      userId: '633167204e955592b31a795e',
      userImg:
        'https://cdn.icon-icons.com/icons2/1736/PNG/512/4043260-avatar-male-man-portrait_113269.png',
      firstName: 'Bohdan',
      lastName: 'Stetsenko',
      email: 'test@gmail.com',
      createdDate: '9/26/2022',
    };
    const mockedRequestValue: FormGroup = new FormGroup({
      email: new FormControl('john.2000@gmail.com'),
      password: new FormControl('john1234575224'),
      confirmPassword: new FormControl('john1234575224'),
    });
    const request = service.loginUser(mockedRequestValue);
    request.subscribe((res: Answer) => {
      expect(res).toEqual(mockedAnswerValue);
      done();
    });
    const testRequest = httpController.expectOne({
      method: 'POST',
      url: 'http://localhost:8080/api/auth/login',
    });
    testRequest.flush(mockedAnswerValue);
  });
});
