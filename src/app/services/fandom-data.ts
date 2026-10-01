import { Injectable } from '@angular/core';
import { FandomDataset, FandomProfile } from '../models/fandom-profile';

@Injectable({
  providedIn: 'root'
})
export class FandomData {
  private cache?: FandomDataset;

  async getData(): Promise<FandomDataset> {
    if (this.cache) return this.cache;

    const response = await fetch('/data/fandom-data.json');
    if (!response.ok) {
      throw new Error('Fandom data could not be loaded.');
    }

    this.cache = await response.json() as FandomDataset;
    return this.cache;
  }

  async getCategory(key: keyof FandomDataset): Promise<FandomProfile[]> {
    const data = await this.getData();
    return data[key] ?? [];
  }
}
