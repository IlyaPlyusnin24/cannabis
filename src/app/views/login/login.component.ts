import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { LoginService } from '../../services/login-service/login.service';
import { Router } from '@angular/router';
import { StorageService } from '../../services/storage-service/storage.service';

@Component({
  selector: 'can-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm = this.formBuilder.group({
    agencyId: [''],
    password: [''],
  });

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private router: Router,
    private storageService: StorageService
  ) {}

  error: string = '';

  submitForm() {
    this.error = '';
    console.log({ values: this.loginForm.value });

    this.loginService.login(this.loginForm.value).subscribe({
      next: (response: any) => {
        console.log({ response });

        if (response?.message === 'success') {
          this.storageService.setItem('logged_in', 'true');
          this.storageService.setItem(
            'agency_id',
            this.loginForm.value.agencyId!
          );

          this.router.navigate(['/']);
        } else {
          this.error = response.message;
        }
      },
      error: (err) => {
        console.log({ err });
      },
    });
  }
}
