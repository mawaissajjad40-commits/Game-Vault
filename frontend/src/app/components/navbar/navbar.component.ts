import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/auth.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  currentUser: User | null = null;
  isLoggedIn = false;
  menuOpen = false;
  moodOpen = false;

  moods = [
    { id: 'night',     label: '🌙 Night Gamer',  class: 'mood-night' },
    { id: 'light',     label: '☀️ Light Mode',    class: 'mood-light' },
    { id: 'neon',      label: '🔥 Neon Mode',     class: 'mood-neon' },
    { id: 'chill',     label: '🌊 Chill Blue',    class: 'mood-chill' },
    { id: 'cyberpunk', label: '💜 Cyberpunk',      class: 'mood-cyberpunk' },
  ];

  currentMood = this.moods[0];

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
      this.isLoggedIn = !!user;
    });
    const saved = localStorage.getItem('gamevault-mood');
    if (saved) {
      const found = this.moods.find(m => m.id === saved);
      if (found) this.applyMood(found);
    } else {
      this.applyMood(this.moods[0]);
    }
  }

  @HostListener('document:click')
  onDocumentClick(): void {
    this.moodOpen = false;
    this.menuOpen = false;
  }

  toggleMood(event: MouseEvent): void {
    event.stopPropagation();
    this.moodOpen = !this.moodOpen;
    this.menuOpen = false;
  }

  setMood(mood: any, event: MouseEvent): void {
    event.stopPropagation();
    this.applyMood(mood);
    this.moodOpen = false;
  }

  applyMood(mood: any): void {
    this.moods.forEach(m => document.body.classList.remove(m.class));
    document.body.classList.add(mood.class);
    this.currentMood = mood;
    localStorage.setItem('gamevault-mood', mood.id);
  }

  toggleUserMenu(event: MouseEvent): void {
    event.stopPropagation();
    this.menuOpen = !this.menuOpen;
    this.moodOpen = false;
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
    this.menuOpen = false;
  }
}