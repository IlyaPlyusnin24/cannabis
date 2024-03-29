import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideStore } from '@ngrx/store';
import { categoryReducer } from './store/categories.reducer';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { withComponentInputBinding } from '@angular/router';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(),
    provideStore({
      categories: categoryReducer,
    }),
  ],
};
