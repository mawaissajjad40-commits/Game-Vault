import { Component, OnInit } from '@angular/core';
import { GameService } from '../../services/game.service';
import { AuthService } from '../../services/auth.service';
import { Game } from '../../models/game.model';

@Component({
  selector: 'app-games-list',
  templateUrl: './games-list.component.html',
  styleUrls: ['./games-list.component.css']
})
export class GamesListComponent implements OnInit {
  games: Game[] = [];
  loading = false;
  error: string | null = null;
  page = 1;
  limit = 20;
  totalPages = 0;
  totalGames = 0;
  search = '';
  selectedCategory = 'All';
  isLoggedIn = false;

  categories = ['All','Action','Adventure','Puzzle','RPG','Strategy','Sports','Casual'];

  constructor(private gameService: GameService, private authService: AuthService) {}

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
          this.games = response.games;
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

  onSearch(): void { this.page = 1; this.loadGames(); }

  selectCategory(cat: string): void {
    this.selectedCategory = cat;
    this.page = 1;
    this.loadGames();
  }

  resetFilters(): void {
    this.search = '';
    this.selectedCategory = 'All';
    this.page = 1;
    this.loadGames();
  }

  previousPage(): void { if (this.page > 1) { this.page--; this.loadGames(); } }
  nextPage(): void { if (this.page < this.totalPages) { this.page++; this.loadGames(); } }

  saveGame(game: Game): void {
    this.gameService.saveGame(game._id).subscribe({
      next: () => alert('✅ Saved to your collection!'),
      error: (err) => alert(err.error?.message || 'Failed to save game')
    });
  }
}