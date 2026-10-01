export interface FandomProfile {
  id: number;
  name: string;
  series: string;
  genre: string;
  description: string;
  traits: string[];
  image: string;
  tags: string[];
  featured: boolean;
  createdAt: string;
}

export interface FandomDataset {
  anime: FandomProfile[];
  gaming: FandomProfile[];
  movies: FandomProfile[];
  tvShows: FandomProfile[];
  kpop: FandomProfile[];
  comics: FandomProfile[];
  manga: FandomProfile[];
}
