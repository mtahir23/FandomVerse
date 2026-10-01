import { Injectable, signal, computed } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class SiteData {
  private cache: any;
  readonly cartVersion = signal(0);
  readonly bookmarkVersion = signal(0);
  readonly cartCount = computed(() => { this.cartVersion(); return this.getCart().length; });
  readonly bookmarkCount = computed(() => { this.bookmarkVersion(); return this.getBookmarks().length; });

  async getData(): Promise<any> {
    if (this.cache) return this.cache;
    const response = await fetch('/data/fandom-data.json');
    if (!response.ok) throw new Error('Site data could not be loaded.');
    this.cache = await response.json();
    return this.cache;
  }

  getBookmarks(): any[] {
    if (typeof localStorage === 'undefined') return [];
    try { return JSON.parse(localStorage.getItem('fandomverse-bookmarks') || '[]'); } catch { return []; }
  }
  toggleBookmark(item: any): boolean {
    const items = this.getBookmarks();
    const index = items.findIndex(x => x.key === item.key);
    if (index >= 0) items.splice(index, 1); else items.push(item);
    if (typeof localStorage !== 'undefined') localStorage.setItem('fandomverse-bookmarks', JSON.stringify(items));
    this.bookmarkVersion.update(v => v + 1);
    return index < 0;
  }
  isBookmarked(key: string): boolean { this.bookmarkVersion(); return this.getBookmarks().some(x => x.key === key); }
  getNote(key: string): string { if (typeof sessionStorage === 'undefined') return ''; return sessionStorage.getItem('fandomverse-note-' + key) || ''; }
  saveNote(key: string, note: string): void { if (typeof sessionStorage !== 'undefined') sessionStorage.setItem('fandomverse-note-' + key, note); }
  clearNote(key: string): void { if (typeof sessionStorage !== 'undefined') sessionStorage.removeItem('fandomverse-note-' + key); }

  getCart(): any[] {
    if (typeof localStorage === 'undefined') return [];
    try { return JSON.parse(localStorage.getItem('fandomverse-cart') || '[]'); } catch { return []; }
  }
  addToCart(item: any): void {
    const cart = this.getCart();
    if (!cart.some(x => x.key === item.key)) {
      cart.push(item);
      if (typeof localStorage !== 'undefined') localStorage.setItem('fandomverse-cart', JSON.stringify(cart));
      this.cartVersion.update(v => v + 1);
    }
  }
  removeFromCart(key: string): void {
    const cart = this.getCart().filter(x => x.key !== key);
    if (typeof localStorage !== 'undefined') localStorage.setItem('fandomverse-cart', JSON.stringify(cart));
    this.cartVersion.update(v => v + 1);
  }
  clearCart(): void {
    if (typeof localStorage !== 'undefined') localStorage.setItem('fandomverse-cart', '[]');
    this.cartVersion.update(v => v + 1);
  }
  cartTotal(): number {
    return this.getCart().reduce((sum, item) => sum + Number(String(item.price ?? 0).replace(/[^0-9.]/g, '')), 0);
  }
}
