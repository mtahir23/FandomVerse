import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FandomData } from '../../services/fandom-data';
import { SiteData } from '../../services/site-data';
import { FandomProfile } from '../../models/fandom-profile';
import { SafeUrlPipe } from '../../pipes/safe-url';

interface FeaturedCard {
  key: string;
  title: string;
  route: string;
  image: string;
  name: string;
  series: string;
  description: string;
  video: string | null;
  profile?: FandomProfile;
}

@Component({ imports:[CommonModule, SafeUrlPipe], selector:'app-featured', styleUrl:'./featured.css', templateUrl:'./featured.html' })
export class Featured implements OnInit {
  cards: FeaturedCard[]=[];
  showAll=false;
  readonly categories:[string,string,string,string,string|null][]=[
    ['anime','Anime','/anime','/images/category-uploaded/anime.jpg','https://www.youtube.com/embed/uIW0xWchKJg'],
    ['comics','Comics','/comics','/images/category-uploaded/comics.jpg','https://www.youtube.com/embed/uIW0xWchKJg'],
    ['gaming','Gaming','/gaming','/images/category-uploaded/gaming.jpg',null],
    ['kpop','K-Pop','/k-pop','/images/category-uploaded/k-pop.jpg','https://www.youtube.com/embed/uIW0xWchKJg'],
    ['manga','Manga','/manga','/images/category-uploaded/manga.jpg','https://www.youtube.com/embed/uIW0xWchKJg'],
    ['tvShows','TV Shows','/tv-shows','/images/category-uploaded/tv-shows.jpg','https://www.youtube.com/embed/uIW0xWchKJg'],
    ['movies','Movies','/movies','/images/category-uploaded/movies.jpg','https://www.youtube.com/embed/uIW0xWchKJg'],
    ['media','Media','/media','/images/category-uploaded/media.jpg','https://www.youtube.com/embed/uIW0xWchKJg'],
    ['trailers','Trailers','/trailers','/images/category-uploaded/trailer.jpg','https://www.youtube.com/embed/uIW0xWchKJg']
  ];
  constructor(private data:FandomData, public site:SiteData){}

  async ngOnInit(){
    for(const [key,title,route,image,video] of this.categories){
      let profile:FandomProfile|undefined;
      if(['anime','comics','gaming','kpop','manga','tvShows','movies'].includes(key)){
        const profiles=await this.data.getCategory(key as any);
        profile=profiles[0];
      }
      this.cards.push({
        key,title,route,image,video,profile,
        name: profile?.name || `${title} Featured`,
        series: profile?.series || title,
        description: profile?.description || `Explore the latest ${title} content in FandomVerse.`
      });
    }
  }

  get visibleCards(){ return this.showAll ? this.cards : this.cards.slice(0,3); }
  toggleAll(){ this.showAll=!this.showAll; }

  openVideo(card:FeaturedCard){
    if(!card.video) return;
    const el=document.getElementById('featured-video-'+card.key) as HTMLDialogElement | null;
    el?.showModal();
  }
  closeVideo(key:string){ const el=document.getElementById('featured-video-'+key) as HTMLDialogElement | null; el?.close(); }

  bookmark(card:FeaturedCard){ this.site.toggleBookmark({key:`featured-${card.key}`,name:card.name,series:card.series,category:card.title,image:card.image}); }
  addCart(card:FeaturedCard){ this.site.addToCart({key:`featured-cart-${card.key}`,name:`${card.name} Fan Card`,price:'$9.99',category:card.title,image:card.image,description:`Fan card for ${card.name}`}); }
  isBookmarked(card:FeaturedCard){ return this.site.isBookmarked(`featured-${card.key}`); }
  isInCart(card:FeaturedCard){ return this.site.getCart().some(x=>x.key===`featured-cart-${card.key}`); }
}
