import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, takeUntil } from 'rxjs/operators';
import { SongService } from './song.service';

interface Genre {
  id: number;
  name: string;
}

@Component({
  selector: 'app-song',
  templateUrl: './song.component.html',
  styleUrls: ['./song.component.scss'],
})
export class SongComponent implements OnInit, OnDestroy {
  songs: any[] = [];
  loading = false;

  searchQuery = '';
  searchInLyrics = false;
  selectedGenreId: number | null = null;
  genres: Genre[] = [];

  private searchSubject = new Subject<void>();
  private destroy$ = new Subject<void>();

  constructor(
    private songService: SongService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.genres = [
      {
        id: 2001,
        name: 'Рок поп',
      },
      {
        id: 2002,
        name: 'Хип хоп',
      },
      {
        id: 2003,
        name: 'Нийтийн, Ардын дуу',
      },
      {
        id: 2004,
        name: 'Орос дуу',
      },
      {
        id: 2005,
        name: 'Англи дуу',
      },
      {
        id: 2006,
        name: 'Казак дуу',
      },
      {
        id: 2007,
        name: 'Диско',
      },
      {
        id: 2008,
        name: 'Хүүхдийн',
      },
    ];
    this.loadLatestSongs();
    this.setupSearch();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadLatestSongs(): void {
    this.loading = true;
    this.songService.getSongs({ limit: 100 }).subscribe({
      next: (res) => {
        this.songs = res?.data || [];
        this.loading = false;
      },
      error: () => {
        this.songs = [];
        this.loading = false;
      },
    });
  }

  setupSearch(): void {
    this.searchSubject
      .pipe(
        debounceTime(400),
        switchMap(() => {
          this.loading = true;
          const params: any = { limit: 20 };
          if (this.searchQuery.trim()) params.search = this.searchQuery.trim();
          if (this.searchInLyrics) params.searchInLyrics = true;
          if (this.selectedGenreId != null) params.genreId = this.selectedGenreId;
          return this.songService.getSongs(params);
        }),
        takeUntil(this.destroy$),
      )
      .subscribe({
        next: (res) => {
          this.songs = res?.data || [];
          this.loading = false;
        },
        error: () => {
          this.songs = [];
          this.loading = false;
        },
      });
  }

  onSearchInput(): void {
    this.searchSubject.next();
  }

  onGenreChange(): void {
    this.searchSubject.next();
  }

  onSearchModeChange(): void {
    if (this.searchQuery.trim()) {
      this.searchSubject.next();
    }
  }

  openDetail(songId: string): void {
    this.router.navigate(['/song', songId]);
  }
}
