import { Component, OnInit } from '@angular/core';
import { GameService } from '../../services/game.service';
import { SavedGame } from '../../models/game.model';

@Component({
  selector: 'app-saved-games',
  templateUrl: './saved-games.component.html',
  styleUrls: ['./saved-games.component.css']
})
export class SavedGamesComponent implements OnInit {
  savedGames: SavedGame[] = [];
  loading = true;
  error: string | null = null;
  selectedStatus: string | null = null;

  statuses = [
    { value: 'wishlist', label: '🎯 Wishlist' },
    { value: 'playing', label: '▶️ Playing' },
    { value: 'completed', label: '✅ Completed' },
    { value: 'archived', label: '📦 Archived' }
  ];

  constructor(private gameService: GameService) {}

  ngOnInit(): void {
    this.loadSavedGames();
  }

  loadSavedGames(): void {
    this.loading = true;
    this.error = null;

    this.gameService.getUserSavedGames().subscribe({
      next: (response) => {
        this.savedGames = response.savedGames;
        this.loading = false;
      },
      error: (error) => {
        this.error = error.error?.message || 'Failed to load saved games';
        this.loading = false;
      }
    });
  }

  getFilteredGames(): SavedGame[] {
    if (!this.selectedStatus) {
      return this.savedGames;
    }
    return this.savedGames.filter(sg => sg.status === this.selectedStatus);
  }

  removeGame(id: string): void {
    if (confirm('Remove this game from your collection?')) {
      this.gameService.removeSavedGame(id).subscribe({
        next: () => {
          this.savedGames = this.savedGames.filter(sg => sg._id !== id);
          alert('Game removed');
        },
        error: (error) => {
          alert(error.error?.message || 'Failed to remove game');
        }
      });
    }
  }

  getStatusBadgeClass(status: string): string {
    const mapping: { [key: string]: string } = {
      'wishlist': 'bg-info',
      'playing': 'bg-warning text-dark',
      'completed': 'bg-success',
      'archived': 'bg-secondary'
    };
    return mapping[status] || 'bg-secondary';
  }
}
