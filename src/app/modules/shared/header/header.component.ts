import { Component, Injector } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { ContactComponent } from '../contact/contact.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: [],
})
export class HeaderComponent {
  isShowContact = false;
  isMenuOpen = false;
  constructor(private dialogService: DialogService, private router: Router) {}

  showDialog() {
    const dialogRef = this.dialogService.open(ContactComponent, {
      // header: 'Холбогдох',
      width: '80vw',
      height: '80vh',
    });

    dialogRef.onClose.subscribe(() => {});
  }

  onProductClick(id: number) {
    // Force router navigation with reload
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/product', id]);
    });
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    const nav = document.querySelector('.header-area .nav') as HTMLElement;
    if (nav) {
      if (this.isMenuOpen) {
        nav.style.display = 'block';
        setTimeout(() => {
          nav.style.maxHeight = '500px';
          nav.style.opacity = '1';
        }, 10);
      } else {
        nav.style.maxHeight = '0';
        nav.style.opacity = '0';
        setTimeout(() => {
          nav.style.display = 'none';
        }, 200);
      }
    }
  }
}
