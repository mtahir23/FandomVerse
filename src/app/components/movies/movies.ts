import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FandomData } from '../../services/fandom-data';
import { FandomProfile } from '../../models/fandom-profile';
import { SiteData } from '../../services/site-data';
import { SafeUrlPipe } from '../../pipes/safe-url';

@Component({
  selector: 'app-movies',
  imports: [CommonModule, FormsModule, SafeUrlPipe],
  templateUrl: './movies.html',
  styleUrl: './movies.css'
})
export class Movies implements OnInit {
  allProfiles: FandomProfile[] = [];
  filteredProfiles: FandomProfile[] = [];
  searchTerm = '';
  selectedGenre = 'All';
  sortBy = 'featured';
  loading = true;
  galleryImage = '';
  errorMessage = '';
  selectedVideo = '';
  selectedVideoTitle = '';

  readonly title = 'Movies';
  readonly subtitle = 'Explore movie characters, stories, and cinematic fandom profiles.';

  constructor(private readonly fandomData: FandomData, public readonly siteData: SiteData) {}

  async ngOnInit(): Promise<void> {
    try {
      this.allProfiles = await this.fandomData.getCategory('movies');
      this.applyFilters();
    } catch (error) {
      console.error(error);
      this.errorMessage = 'Content could not be loaded right now.';
    } finally {
      this.loading = false;
    }
  }

  get genres(): string[] {
    return ['All', ...new Set(this.allProfiles.map(profile => profile.genre))];
  }

  saveBookmark(profile: FandomProfile): void {
    this.siteData.toggleBookmark({
      key: `profile-movies-${profile.id}`,
      name: profile.name,
      series: profile.series,
      category: 'movies',
      image: profile.image
    });
  }

  openGallery(image: string): void { this.galleryImage = image; }
  closeGallery(): void { this.galleryImage = ''; }

  openVideo(profile: FandomProfile): void {
    this.selectedVideo = 'https://www.youtube.com/embed/uIW0xWchKJg';
    this.selectedVideoTitle = `${profile.name} • ${profile.series}`;
  }

  closeVideo(): void {
    this.selectedVideo = '';
    this.selectedVideoTitle = '';
  }

  isInCart(profile: FandomProfile): boolean { return this.siteData.getCart().some(item => item.key === `profile-cart-movies-${profile.id}`); }

  addToCart(profile: FandomProfile): void {
    this.siteData.addToCart({
      key: `profile-cart-movies-${profile.id}`,
      name: `${profile.name} Fan Card`,
      price: '$9.99',
      category: profile.genre,
      image: profile.image,
      description: `Fan card for ${profile.name}`
    });
  }

  applyFilters(): void {
    const query = this.searchTerm.trim().toLowerCase();
    let result = this.allProfiles.filter(profile => {
      const matchesGenre = this.selectedGenre === 'All' || profile.genre === this.selectedGenre;
      const haystack = [profile.name, profile.series, profile.genre, profile.description, ...profile.traits].join(' ').toLowerCase();
      return matchesGenre && (!query || haystack.includes(query));
    });

    if (this.sortBy === 'az') {
      result = [...result].sort((a, b) => a.name.localeCompare(b.name));
    } else if (this.sortBy === 'newest') {
      result = [...result].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    } else {
      result = [...result].sort((a, b) => Number(b.featured) - Number(a.featured));
    }

    this.filteredProfiles = result;
  }
}
