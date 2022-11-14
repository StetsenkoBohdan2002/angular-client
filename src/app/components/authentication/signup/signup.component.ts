import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Answer } from 'src/app/models/request.model';
import { AuthService } from 'src/app/services/auth.service';
interface newUser {
  confirmPassword: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  styles: [
    `
      :host {
        width: 100%;
      }
    `,
  ],
})
export class SignupComponent implements OnInit {
  error: boolean = false;
  profileForm = new FormGroup({
    firstName: new FormControl('', [
      Validators.minLength(3),
      Validators.pattern(/[A-Z][a-z]+/),
      Validators.required,
    ]),
    lastName: new FormControl('', [
      Validators.minLength(3),
      Validators.pattern(/[A-Z][a-z]+/),
      Validators.required,
    ]),
    email: new FormControl('', [
      Validators.pattern(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      ),
      Validators.required,
    ]),
    password: new FormControl('', [
      Validators.minLength(3),
      Validators.required,
    ]),
    confirmPassword: new FormControl('', [
      Validators.minLength(3),
      Validators.required,
    ]),
  });
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit(): void {}
  signUp(): void {
    if (
      this.profileForm.valid &&
      this.profileForm.get('password')?.value ===
        this.profileForm.get('confirmPassword')?.value
    ) {
      this.authService
        .registerNewUser(this.profileForm)
        .subscribe((res: Answer) => {
          if (res.status === 200) {
            this.router.navigate(['../login'], { relativeTo: this.route });
          }
        });
    } else {
      this.error = true;
    }
  }
}
