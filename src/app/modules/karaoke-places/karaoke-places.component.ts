import { Component, OnInit, OnDestroy, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import * as L from 'leaflet';

// Fix default marker icon paths for Angular/Webpack
const iconRetinaUrl = 'assets/marker-icon-2x.png';
const iconUrl = 'assets/marker-icon.png';
const shadowUrl = 'assets/marker-shadow.png';
const DefaultIcon = L.icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

@Component({
  selector: 'app-karaoke-places',
  templateUrl: './karaoke-places.component.html',
  styleUrls: ['./karaoke-places.component.scss'],
})
export class KaraokePlacesComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('mapContainer') mapContainer!: ElementRef;

  places: any[] = [];
  filteredPlaces: any[] = [];
  loading = false;

  searchQuery = '';
  userLat: number | null = null;
  userLng: number | null = null;

  // Detail modal
  selectedPlace: any = null;
  detailLoading = false;
  currentSlide = 0;

  private map: L.Map | null = null;
  private markers: Map<string, L.Marker> = new Map();
  private mapReady = false;
  private placesLoaded = false;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getUserLocation();
  }

  ngAfterViewInit(): void {
    this.initMap();
    this.mapReady = true;
    if (this.placesLoaded) {
      this.addMarkersToMap();
    }
  }

  ngOnDestroy(): void {
    this.map?.remove();
  }

  getUserLocation(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          this.userLat = pos.coords.latitude;
          this.userLng = pos.coords.longitude;
          this.loadPlaces();
          if (this.map) {
            this.map.setView([this.userLat!, this.userLng!], 12);
          }
        },
        () => {
          // Default to Ulaanbaatar center
          this.userLat = 47.8806789;
          this.userLng = 106.86153;
          this.loadPlaces();
        },
      );
    } else {
      this.userLat = 47.8806789;
      this.userLng = 106.86153;
      this.loadPlaces();
    }
  }

  loadPlaces(): void {
    this.loading = true;
    const url = `${environment.songUrl}/api/v1/places?lat=${this.userLat}&lng=${this.userLng}`;
    let httpParams = new HttpParams();
    httpParams = httpParams.set('limit', 2000);
    this.http
      .get<any>(url, {
        headers: { 'x-api-key': 'HD9RxmGUaBYEJfByeURczsmTVoaIv3qzZZG8b3ZLKHOmQAhJZWVC' },
        params: httpParams,
      })
      .subscribe({
        next: (res) => {
          this.places = res?.data || res || [];
          this.filteredPlaces = [...this.places];
          this.loading = false;
          this.placesLoaded = true;
          if (this.mapReady) {
            this.addMarkersToMap();
          }
        },
        error: () => {
          this.places = [];
          this.filteredPlaces = [];
          this.loading = false;
        },
      });
  }

  initMap(): void {
    const center: L.LatLngTuple = [this.userLat ?? 47.8806789, this.userLng ?? 106.86153];
    this.map = L.map(this.mapContainer.nativeElement, {
      center,
      zoom: 12,
      zoomControl: true,
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
      maxZoom: 19,
    }).addTo(this.map);
  }

  addMarkersToMap(): void {
    if (!this.map) return;
    this.markers.forEach((m) => m.remove());
    this.markers.clear();

    this.places.forEach((place) => {
      if (!place.latitude || !place.longitude) return;
      const marker = L.marker([place.latitude, place.longitude])
        .addTo(this.map!)
        .bindPopup(
          `<div class="map-popup">
            <strong>${place.name}</strong>
            ${place.phoneNumber ? `<br><span>📞 ${place.phoneNumber}</span>` : ''}
          </div>`,
          { maxWidth: 220 },
        );
      this.markers.set(place.id, marker);
    });
  }

  onSearch(): void {
    const q = this.searchQuery.trim().toLowerCase();
    if (!q) {
      this.filteredPlaces = [...this.places];
    } else {
      this.filteredPlaces = this.places.filter(
        (p) => (p.name || '').toLowerCase().includes(q) || (p.nameTr || '').toLowerCase().includes(q),
      );
    }
  }

  focusOnMap(place: any): void {
    if (!this.map || !place.latitude || !place.longitude) return;
    this.map.setView([place.latitude, place.longitude], 15, { animate: true });
    const marker = this.markers.get(place.id);
    if (marker) {
      marker.openPopup();
    }
  }

  openDetail(place: any): void {
    this.selectedPlace = null;
    this.currentSlide = 0;
    this.detailLoading = true;
    document.body.style.overflow = 'hidden';
    this.http
      .get<any>(`${environment.songUrl}/api/v1/places/${place.id}`, {
        headers: { 'x-api-key': 'HD9RxmGUaBYEJfByeURczsmTVoaIv3qzZZG8b3ZLKHOmQAhJZWVC' },
      })
      .subscribe({
        next: (data) => {
          this.selectedPlace = data;
          this.detailLoading = false;
        },
        error: () => {
          this.selectedPlace = { ...place, covers: [] };
          this.detailLoading = false;
        },
      });
    // show modal immediately with basic data while loading detail
    this.selectedPlace = { ...place, covers: [] };
    this.detailLoading = true;
  }

  closeDetail(): void {
    this.selectedPlace = null;
    document.body.style.overflow = '';
  }

  prevSlide(): void {
    if (!this.selectedPlace?.covers?.length) return;
    this.currentSlide = (this.currentSlide - 1 + this.selectedPlace.covers.length) % this.selectedPlace.covers.length;
  }

  nextSlide(): void {
    if (!this.selectedPlace?.covers?.length) return;
    this.currentSlide = (this.currentSlide + 1) % this.selectedPlace.covers.length;
  }

  goToSlide(i: number): void {
    this.currentSlide = i;
  }

  formatDistance(meters: string | number): string {
    const m = typeof meters === 'string' ? parseFloat(meters) : meters;
    if (isNaN(m)) return '';
    if (m < 1000) return `${Math.round(m)}м`;
    return `${(m / 1000).toFixed(1)}км`;
  }

  get defaultImage(): string {
    return 'assets/images/karaoke-default.png';
  }
}
