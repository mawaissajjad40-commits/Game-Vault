import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GameService } from '../../services/game.service';
import { AuthService } from '../../services/auth.service';
import { Game } from '../../models/game.model';

interface Toast { message: string; type: 'success' | 'error' | 'info'; id: number; }

@Component({
  selector: 'app-games-list',
  templateUrl: './games-list.component.html',
  styleUrls: ['./games-list.component.css']
})
export class GamesListComponent implements OnInit {
  games: Game[] = [];
  allGames: Game[] = [];
  loading = false;
  error: string | null = null;
  page = 1;
  limit = 20;
  totalPages = 0;
  totalGames = 0;
  search = '';
  selectedCategory = 'All';
  isLoggedIn = false;
  minRating = 0;
  toasts: Toast[] = [];
  toastId = 0;
  isLuckySpinning = false;

  categories = ['All','Action','Adventure','Puzzle','RPG','Strategy','Sports','Casual'];

  constructor(
    private gameService: GameService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.currentUser$.subscribe(user => { this.isLoggedIn = !!user; });
    this.loadGames();
  }

  loadGames(): void {
    this.loading = true;
    this.error = null;
    const category = this.selectedCategory === 'All' ? undefined : this.selectedCategory;

    this.gameService.getAllGames(this.page, this.limit, category, this.search || undefined)
      .subscribe({
        next: (response) => {
          this.allGames = response.games;
          this.applyRatingFilter();
          this.totalPages = response.pagination.pages;
          this.totalGames = response.pagination.total;
          this.loading = false;
        },
        error: (err) => {
          this.error = err.error?.message || 'Failed to load games';
          this.loading = false;
        }
      });
  }

  applyRatingFilter(): void {
    this.games = this.allGames.filter(g => g.rating >= this.minRating);
  }

  onRatingFilter(): void { this.applyRatingFilter(); }
  onSearch(): void { this.page = 1; this.loadGames(); }
  selectCategory(cat: string): void { this.selectedCategory = cat; this.page = 1; this.loadGames(); }
  resetFilters(): void { this.search = ''; this.selectedCategory = 'All'; this.minRating = 0; this.page = 1; this.loadGames(); }
  previousPage(): void { if (this.page > 1) { this.page--; this.loadGames(); } }
  nextPage(): void { if (this.page < this.totalPages) { this.page++; this.loadGames(); } }

  saveGame(game: Game): void {
    this.gameService.saveGame(game._id).subscribe({
      next: () => this.showToast('✅ Saved to your collection!', 'success'),
      error: (err) => this.showToast(err.error?.message || 'Failed to save', 'error')
    });
  }

  feelingLucky(): void {
    if (this.games.length === 0) return;
    this.isLuckySpinning = true;
    setTimeout(() => {
      const random = this.games[Math.floor(Math.random() * this.games.length)];
      this.isLuckySpinning = false;
      this.router.navigate(['/games', random._id]);
    }, 800);
  }

  showToast(message: string, type: 'success' | 'error' | 'info'): void {
    const id = ++this.toastId;
    this.toasts.push({ message, type, id });
    setTimeout(() => { this.toasts = this.toasts.filter(t => t.id !== id); }, 3000);
  }

  getStars(rating: number): number[] {
    return Array(Math.round(rating)).fill(0);
  }
}