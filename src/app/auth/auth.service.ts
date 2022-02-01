import { Injectable } from "@angular/core";

import { StorageService } from "../services/storage.service";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  private storageApiKey = "githubApiToken";

  constructor(private storageService: StorageService) {
  }

  get isLoggedIn() {
    return Boolean(this.storageService.get(this.storageApiKey));
  }

  getToken() {
    return this.storageService.get(this.storageApiKey);
  }

  saveToken(token: string) {
    this.storageService.set(this.storageApiKey, token);
  }

  removeToken() {
    this.storageService.remove(this.storageApiKey);
  }
}
