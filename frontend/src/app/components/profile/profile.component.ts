import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/auth.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profileForm!: FormGroup;
  currentUser: User | null = null;
  submitted = false;
  loading = false;
  success: string | null = null;
  error: string | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.authService.currentUser$.subscribe(user => {
      if (user) {
        this.currentUser = user;
        this.profileForm.patchValue({
          username: user.username,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName
        });
      }
    });
  }

  private initializeForm(): void {
    this.profileForm = this.formBuilder.group({
      username: [{ value: '', disabled: true }],
      email: [{ value: '', disabled: true }],
      firstName: ['', [Validators.maxLength(50)]],
      lastName: ['', [Validators.maxLength(50)]]
    });
  }

  get f() {
    return this.profileForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;
    this.success = null;
    this.error = null;

    if (this.profileForm.invalid) {
      return;
    }

    this.loading = true;
    const updateData = {
      firstName: this.f['firstName'].value,
      lastName: this.f['lastName'].value
    };

    this.authService.updateProfile(updateData).subscribe({
      next: (response) => {
        this.loading = false;
        this.success = 'Profile updated successfully!';
        this.submitted = false;
      },
      error: (error) => {
        this.loading = false;
        this.error = error.error?.message || 'Failed to update profile';
      }
    });
  }

  logout(): void {
    this.authService.logout();
  }
}
