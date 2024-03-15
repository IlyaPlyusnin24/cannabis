import { Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { StatuteComponent } from './views/statute/statute.component';

export const routes: Routes = [
  { path: 'statute/:category', component: StatuteComponent },
  { path: '**', component: HomeComponent },
];
