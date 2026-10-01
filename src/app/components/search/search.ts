import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FandomData } from '../../services/fandom-data';
import { FandomDataset, FandomProfile } from '../../models/fandom-profile';

interface SearchResult extends FandomProfile {
  category: string;
  categoryLabel: string;
  contentType: string;
}

@Component({
  selector: 'app-search',
  imports: [FormsModule, RouterLink],
  templateUrl: './search.html',
  styleUrl: './search.css'
})
export class Search implements OnInit {
  query = '';
  selectedCategory = 'all';
  selectedType = 'all';
  sortBy = 'relevance';
  loading = true;
  error = '';

  private allResults: SearchResult[] = [];
  results: SearchResult[] = [];

  readonly categories = [
    { key: 'anime', label: 'Anime' },
    { key: 'gaming', label: 'Gaming' },
    { key: 'movies', label: 'Movies' },
    { key: 'tvShows', label: 'TV Shows' },
    { key: 'kpop', label: 'K-Pop' },
    { key: 'comics', label: 'Comics' },
    { key: 'manga', label: 'Manga' }
  ];

  readonly contentTypes = ['Character'];

  constructor(
    private readonly fandomData: FandomData,
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) {}

  async ngOnInit(): Promise<void> {
    this.route.queryParamMap.subscribe(params => {
      this.query = params.get('q') ?? '';
      this.selectedCategory = params.get('category') ?? 'all';
      this.selectedType = params.get('type') ?? 'all';
      this.sortBy = params.get('sort') ?? 'relevance';
      if (!this.loading || this.allResults.length) this.applyFilters();
    });

    try {
      const data = await this.fandomData.getData();
      this.allResults = this.flattenData(data);
      this.applyFilters();
    } catch (error) {
      console.error(error);
      this.error = 'Search data could not be loaded. Please refresh the page.';
    } finally {
      this.loading = false;
    }
  }

  search(): void {
    void this.router.navigate(['/search'], {
      queryParams: {
        q: this.query.trim() || null,
        category: this.selectedCategory === 'all' ? null : this.selectedCategory,
        type: this.selectedType === 'all' ? null : this.selectedType,
        sort: this.sortBy === 'relevance' ? null : this.sortBy
      }
    });
  }

  onFilterChange(): void {
    this.search();
  }

  clearSearch(): void {
    this.query = '';
    this.selectedCategory = 'all';
    this.selectedType = 'all';
    this.sortBy = 'relevance';
    this.search();
  }

  private flattenData(data: FandomDataset): SearchResult[] {
    return this.categories.flatMap(category =>
      data[category.key as keyof FandomDataset].map(profile => ({
        ...profile,
        category: category.key,
        categoryLabel: category.label,
        contentType: 'Character'
      }))
    );
  }

  private applyFilters(): void {
    const normalizedQuery = this.query.trim().toLowerCase();

    let filtered = this.allResults.filter(result => {
      const categoryMatches = this.selectedCategory === 'all' || result.category === this.selectedCategory;
      const typeMatches = this.selectedType === 'all' || result.contentType === this.selectedType;

      if (!categoryMatches || !typeMatches) return false;
      if (!normalizedQuery) return true;

      const searchableText = [
        result.name,
        result.series,
        result.genre,
        result.description,
        ...result.traits,
        ...result.tags,
        result.categoryLabel,
        result.contentType
      ].join(' ').toLowerCase();

      return searchableText.includes(normalizedQuery);
    });

    if (this.sortBy === 'name') {
      filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name));
    } else if (this.sortBy === 'newest') {
      filtered = [...filtered].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    } else if (this.sortBy === 'featured') {
      filtered = [...filtered].sort((a, b) => Number(b.featured) - Number(a.featured));
    } else if (normalizedQuery) {
      filtered = [...filtered].sort((a, b) => this.relevanceScore(b, normalizedQuery) - this.relevanceScore(a, normalizedQuery));
    }

    this.results = filtered;
  }

  private relevanceScore(result: SearchResult, query: string): number {
    const name = result.name.toLowerCase();
    const series = result.series.toLowerCase();
    const genre = result.genre.toLowerCase();

    let score = 0;
    if (name === query) score += 100;
    if (name.startsWith(query)) score += 50;
    if (name.includes(query)) score += 30;
    if (series.includes(query)) score += 20;
    if (genre.includes(query)) score += 10;
    if (result.tags.some(tag => tag.toLowerCase().includes(query))) score += 10;
    if (result.featured) score += 2;
    return score;
  }
}
