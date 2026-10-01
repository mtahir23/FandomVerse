import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Featured } from '../featured/featured';
import { FandomData } from '../../services/fandom-data';
import { SiteData } from '../../services/site-data';
import { FandomProfile } from '../../models/fandom-profile';
import { SafeUrlPipe } from '../../pipes/safe-url';

interface HomeCard { key: string; title: string; route: string; category: string; profile: FandomProfile; video: string; }
interface CategoryCard { key: string; title: string; route: string; image: string; video: string | null; }

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterLink, Featured, SafeUrlPipe],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit {
  currentDateTime = '';
  visitorCount = 0;
  selectedCard: HomeCard | null = null;
  selectedCategoryCard: CategoryCard | null = null;
  cards: HomeCard[] = [];
  readonly categories: CategoryCard[] = [
    {key:'anime',title:'Anime',route:'/anime',image:'/images/category-uploaded/anime.jpg',video:'https://www.youtube.com/embed/uIW0xWchKJg'},
    {key:'comics',title:'Comics',route:'/comics',image:'/images/category-uploaded/comics.jpg',video:'https://www.youtube.com/embed/uIW0xWchKJg'},
    {key:'gaming',title:'Gaming',route:'/gaming',image:'/images/category-uploaded/gaming.jpg',video:null},
    {key:'kpop',title:'K-Pop',route:'/k-pop',image:'/images/category-uploaded/k-pop.jpg',video:'https://www.youtube.com/embed/uIW0xWchKJg'},
    {key:'manga',title:'Manga',route:'/manga',image:'/images/category-uploaded/manga.jpg',video:'https://www.youtube.com/embed/uIW0xWchKJg'},
    {key:'tvShows',title:'TV Shows',route:'/tv-shows',image:'/images/category-uploaded/tv-shows.jpg',video:'https://www.youtube.com/embed/uIW0xWchKJg'},
    {key:'movies',title:'Movies',route:'/movies',image:'/images/category-uploaded/movies.jpg',video:'https://www.youtube.com/embed/uIW0xWchKJg'},
    {key:'media',title:'Media',route:'/media',image:'/images/category-uploaded/media.jpg',video:'https://www.youtube.com/embed/uIW0xWchKJg'},
    {key:'trailers',title:'Trailers',route:'/trailers',image:'/images/category-uploaded/trailer.jpg',video:'https://www.youtube.com/embed/uIW0xWchKJg'}
  ];
  constructor(private fandomData: FandomData, public siteData: SiteData) {}
  async ngOnInit() {
    this.currentDateTime = new Date().toLocaleString();
    setInterval(() => this.currentDateTime = new Date().toLocaleString(), 1000);
    if (typeof localStorage !== 'undefined') { this.visitorCount = Number(localStorage.getItem('fandomverse-visitors') || '0') + 1; localStorage.setItem('fandomverse-visitors', String(this.visitorCount)); } else { this.visitorCount = 1; }
    const videos: Record<string,string> = {anime:'https://www.youtube.com/embed/uIW0xWchKJg',gaming:'/media/gaming.mp4',movies:'/media/movies.mp4',tvShows:'/media/tv-shows.mp4',kpop:'/media/k-pop.mp4',comics:'/media/comics.mp4',manga:'/media/manga.mp4'};
    for (const c of this.categories.filter(x => ['anime','gaming','movies','tvShows','kpop','comics','manga'].includes(x.key))) {
      const profiles = await this.fandomData.getCategory(c.key as any);
      if (profiles.length) this.cards.push({key:c.key,title:c.title,route:c.route,category:c.key,profile:profiles[0],video:videos[c.key]});
    }
  }
  openCard(card: HomeCard) { this.selectedCard = card; }
  closeCard() { this.selectedCard = null; this.selectedCategoryCard = null; }
  openCategoryCard(card: CategoryCard) { if (card.video) this.selectedCategoryCard = card; }
  exploreCategory(card: CategoryCard, event: Event) { event.stopPropagation(); window.location.href = card.route; }
  bookmark(card: HomeCard) { this.siteData.toggleBookmark({key:`profile-${card.category}-${card.profile.id}`,name:card.profile.name,series:card.profile.series,category:card.category,image:card.profile.image}); }
  addCart(card: HomeCard) { this.siteData.addToCart({key:`profile-cart-${card.category}-${card.profile.id}`,name:`${card.profile.name} Fan Card`,price:'$9.99',category:card.title,image:card.profile.image,description:`Fan card for ${card.profile.name}`}); }
  isBookmarked(card: HomeCard) { return this.siteData.isBookmarked(`profile-${card.category}-${card.profile.id}`); }
  isInCart(card: HomeCard) { return this.siteData.getCart().some(x=>x.key===`profile-cart-${card.category}-${card.profile.id}`); }
}
