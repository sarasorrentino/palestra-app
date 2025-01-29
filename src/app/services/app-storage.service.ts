import { Injectable } from '@angular/core';

import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private _storage: Storage | null = null;

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    const storage = await this.storage.create();
    this._storage = storage;
    //console.log("creato");
  }

  public async set(key: string, value: any) {
    let result = await this._storage?.set(key, value);
    console.log(result);
  }

  public async get(key: string) {
    let value = this._storage?.get(key);
    return value;
  }

  public async clear() {
    let value = await this._storage?.clear();
    console.log('Local storage cleared');
  }
}
