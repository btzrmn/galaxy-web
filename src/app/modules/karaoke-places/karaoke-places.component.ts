import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-karaoke-places',
  templateUrl: './karaoke-places.component.html',
  styleUrls: ['./karaoke-places.component.scss'],
})
export class KaraokePlacesComponent implements OnInit {
  places: any[] = [];
  loading = false;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadPlaces();
  }

  loadPlaces(): void {
    this.loading = true;
    const url = `${environment.url}/api/custom/external/karaoke-places`;
    this.http.get<any[]>(url).subscribe({
      next: (data) => {
        this.places = data || [];
        this.loading = false;
      },
      error: () => {
        this.places = [];
        this.loading = false;
      },
    });
  }
}
