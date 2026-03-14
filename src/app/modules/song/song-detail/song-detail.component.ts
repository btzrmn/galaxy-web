import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SongService } from '../song.service';

@Component({
  selector: 'app-song-detail',
  templateUrl: './song-detail.component.html',
  styleUrls: ['./song-detail.component.scss'],
})
export class SongDetailComponent implements OnInit {
  song: any = null;
  loading = false;
  error = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private songService: SongService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadSong(id);
    }
  }

  loadSong(id: string): void {
    this.loading = true;
    this.error = false;
    this.songService.getSong(id).subscribe({
      next: (data) => {
        this.song = data;
        this.loading = false;
      },
      error: () => {
        this.error = true;
        this.loading = false;
      },
    });
  }

  goBack(): void {
    this.router.navigate(['/song']);
  }
}
