import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SiteData } from '../../services/site-data';

@Component({ selector: 'app-bookmarks', imports: [CommonModule, RouterLink, FormsModule], templateUrl: './bookmarks.html', styleUrl: './bookmarks.css' })
export class Bookmarks implements OnInit {
  items: any[] = [];
  constructor(public readonly site: SiteData) {}
  ngOnInit(): void { this.items = this.site.getBookmarks().map(x => ({...x, note: this.site.getNote(x.key)})); }
  remove(item: any): void { this.site.toggleBookmark(item); this.site.clearNote(item.key); this.items = this.site.getBookmarks().map(x => ({...x, note: this.site.getNote(x.key)})); }
  saveNote(item: any): void { this.site.saveNote(item.key, item.note || ''); }
  export(): void {
    const text = this.items.map(item => `${item.name} — ${item.category}${item.note ? `\nNote: ${item.note}` : ''}`).join('\n\n');
    const blob = new Blob([text], { type: 'text/plain' }); const a = document.createElement('a');
    a.href = URL.createObjectURL(blob); a.download = 'fandomverse-bookmarks.txt'; a.click(); URL.revokeObjectURL(a.href);
  }
}
