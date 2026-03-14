import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-song',
  templateUrl: './song.component.html',
  styleUrls: ['./song.component.scss'],
})
export class SongComponent implements OnInit {
  songs: any[] = [];
  filtered: any[] = [];
  searchQuery = '';
  loading = false;
  categories: string[] = [];
  activeCategory = 'Бүгд';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadSongs();
  }

  loadSongs(): void {
    this.loading = true;
    const url = `${environment.url}/api/custom/external/songs`;
    this.http.get<any[]>(url).subscribe({
      next: (data) => {
        this.songs = data || [];
        this.filtered = this.songs;
        this.extractCategories();
        this.loading = false;
      },
      error: () => {
        this.songs = [];
        this.filtered = [];
        this.loading = false;
      },
    });
  }

  extractCategories(): void {
    const cats = new Set(this.songs.map((s) => s.category || s.typeName).filter(Boolean));
    this.categories = ['Бүгд', ...Array.from(cats)];
  }

  onSearch(event: Event): void {
    this.searchQuery = (event.target as HTMLInputElement).value;
    this.applyFilters();
  }

  setCategory(cat: string): void {
    this.activeCategory = cat;
    this.applyFilters();
  }

  applyFilters(): void {
    let result = this.songs;
    if (this.activeCategory !== 'Бүгд') {
      result = result.filter(
        (s) => (s.category || s.typeName) === this.activeCategory
      );
    }
    if (this.searchQuery.trim()) {
      const q = this.searchQuery.toLowerCase();
      result = result.filter(
        (s) =>
          (s.name || '').toLowerCase().includes(q) ||
          (s.artist || '').toLowerCase().includes(q)
      );
    }
    this.filtered = result;
  }
}
