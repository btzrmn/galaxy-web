import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ContactService } from './contact.service';
import { HomeService } from '../../home/home.service';

interface ContactForm {
  name: string;
  phoneNumber: string;
  description: string;
}

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements OnInit {
  contactForm: FormGroup;
  submitted = false;
  employees: any[] = [];

  constructor(private fb: FormBuilder, private service: ContactService, private homeService: HomeService) {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^\d{8}$/)]],
      description: ['', [Validators.required, Validators.minLength(5)]],
    });
  }

  ngOnInit(): void {
    this.employees = this.homeService.getEmployees();
  }

  onSubmit() {
    this.submitted = true;

    if (this.contactForm.valid) {
      const formData: ContactForm = this.contactForm.value;

      this.service.create(formData).subscribe({
        next: (response) => {
          this.contactForm.reset();
          this.submitted = false;
          alert('Амжилттай илгээлээ!');
        },
        error: (error) => {
          alert('Алдаа гарлаа. Дахин оролдоно уу.');
        },
      });
    }
  }

  get f() {
    return this.contactForm.controls;
  }

  formatName(firstName: string, lastName: string): string {
    return `${firstName.charAt(0)}. ${lastName}`;
  }
}
