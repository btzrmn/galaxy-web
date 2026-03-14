import { Component, HostListener, OnInit } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { ContactComponent } from '../contact/contact.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isMenuOpen = false;
  isProductOpen = false;
  isScrolled = false;

  constructor(private dialogService: DialogService, private router: Router) {}

  ngOnInit(): void {
    this.isScrolled = window.scrollY > 20;
  }

  @HostListener('window:scroll')
  onScroll(): void {
    this.isScrolled = window.scrollY > 20;
  }

  showDialog(): void {
    this.dialogService.open(ContactComponent, {
      width: '85vw',
      height: '85vh',
    });
  }

  onProductClick(id: number): void {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/product', id]);
    });
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
    if (!this.isMenuOpen) {
      this.isProductOpen = false;
    }
  }

  closeMenu(): void {
    this.isMenuOpen = false;
    this.isProductOpen = false;
  }

  toggleProductSub(): void {
    this.isProductOpen = !this.isProductOpen;
  }
}
