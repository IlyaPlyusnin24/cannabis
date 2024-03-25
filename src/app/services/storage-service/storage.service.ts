import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  setItem(key: string, value: string) {
    sessionStorage.setItem(key, value);
  }

  getItem(key: string) {
    return sessionStorage.getItem(key);
  }

  clearStorage() {
    sessionStorage.clear();
  }
}
