import { Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { StatuteComponent } from './views/statute/statute.component';
import { LoginComponent } from './views/login/login.component';
import { authGuard } from './services/auth-guard-service/auth-guard.service';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'statute/:category',
    canActivate: [authGuard],
    component: StatuteComponent,
  },
  {
    path: '**',
    canActivate: [authGuard],
    component: HomeComponent,
  },
];
