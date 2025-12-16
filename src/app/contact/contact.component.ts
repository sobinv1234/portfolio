import { Component, Injector } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {

  form: any;
  submitting = false;
  success = false;

  constructor(private fb: FormBuilder, private injector: Injector) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required]
    });
  }

  async submit() {
    if (this.form.invalid) return;
    this.submitting = true;
    try {
      const firebase = this.injector.get(FirebaseService);
      await firebase.sendContact(this.form.value as any);
      this.success = true;
      this.form.reset();
    } catch (e) {
      console.error('Contact submit failed', e);
    } finally {
      this.submitting = false;
    }
  }
}
