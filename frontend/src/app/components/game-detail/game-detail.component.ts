import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GameService } from '../../services/game.service';
import { AuthService } from '../../services/auth.service';
import { Game } from '../../models/game.model';

@Component({
  selector: 'app-game-detail',
  templateUrl: './game-detail.component.html',
  styleUrls: ['./game-detail.component.css']
})
export class GameDetailComponent implements OnInit {
  game: Game | null = null;
  loading = true;
  error: string | null = null;
  isLoggedIn = false;
  notes = '';
  rating = 0;

  constructor(
    private gameService: GameService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.currentUser$.subscribe(user => {
      this.isLoggedIn = !!user;
    });

    const gameId = this.route.snapshot.paramMap.get('id');
    if (gameId) {
      this.loadGame(gameId);
    }
  }

  loadGame(gameId: string): void {
    this.gameService.getGameById(gameId).subscribe({
      next: (response) => {
        this.game = response.game;
        this.loading = false;
      },
      error: (error) => {
        this.error = error.error?.message || 'Failed to load game';
        this.loading = false;
      }
    });
  }

  saveGame(): void {
    if (!this.isLoggedIn) {
      this.router.navigate(['/login']);
      return;
    }

    if (!this.game) return;

    this.gameService.saveGame(this.game._id, 'wishlist', this.rating || undefined, this.notes || undefined)
      .subscribe({
        next: () => {
          alert('Game saved successfully!');
          this.notes = '';
          this.rating = 0;
        },
        error: (error) => {
          alert(error.error?.message || 'Failed to save game');
        }
      });
  }

  goBack(): void {
    this.router.navigate(['/games']);
  }
}
