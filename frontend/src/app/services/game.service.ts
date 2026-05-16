import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Game, GamesResponse, SavedGame } from '../models/game.model';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private apiUrl = 'http://localhost:3000/api/scraper';

  constructor(private http: HttpClient) {}

  getAllGames(page: number = 1, limit: number = 20, category?: string, search?: string): Observable<GamesResponse> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());
    
    if (category) {
      params = params.set('category', category);
    }
    
    if (search) {
      params = params.set('search', search);
    }

    return this.http.get<GamesResponse>(`${this.apiUrl}/games`, { params });
  }

  getGameById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/games/${id}`);
  }

  saveGame(gameId: string, status: string = 'wishlist', rating?: number, notes?: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/save`, {
      gameId,
      status,
      rating,
      notes
    });
  }

  getUserSavedGames(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/saved`);
  }

  removeSavedGame(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/saved/${id}`);
  }

  triggerScrape(): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/scrape`, {});
  }
}
