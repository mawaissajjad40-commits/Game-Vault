export interface Game {
  _id: string;
  title: string;
  description: string;
  imageUrl: string;
  sourceUrl: string;
  source: string;
  category: string;
  rating: number;
  downloads: number;
  price: number;
  currency: string;
  tags: string[];
  lastScraped: string;
  createdAt: string;
  updatedAt: string;
}

export interface SavedGame {
  _id: string;
  gameId: Game | null;
  status: 'wishlist' | 'playing' | 'completed' | 'archived';
  rating: number;
  notes: string;
  createdAt: string;
  updatedAt: string;
}

export interface GamesResponse {
  games: Game[];
  pagination: {
    total: number;
    page: number;
    pages: number;
    limit: number;
  };
}
