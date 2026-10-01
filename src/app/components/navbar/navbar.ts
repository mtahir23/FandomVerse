import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { SiteData } from '../../services/site-data';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, FormsModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {
  menuOpen = false;
  searchQuery = '';

  constructor(private readonly router: Router, public readonly siteData: SiteData) {}

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu(): void {
    this.menuOpen = false;
  }

  submitSearch(): void {
    const query = this.searchQuery.trim();
    void this.router.navigate(['/search'], {
      queryParams: { q: query || null }
    });
    this.closeMenu();
  }
}
