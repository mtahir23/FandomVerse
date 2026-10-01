import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { SiteData } from '../../services/site-data';
import { RouterLink } from '@angular/router';

@Component({selector:'app-merchandise',imports:[CommonModule,RouterLink],templateUrl:'./merchandise.html',styleUrl:'./merchandise.css'})
export class Merchandise implements OnInit {
  items:any[]=[];
  constructor(public readonly site:SiteData){}
  async ngOnInit(){ this.items=(await this.site.getData()).merchandise; }
  get cart(){ return this.site.getCart(); }
  add(item:any){ this.site.addToCart(item); }
  remove(item:any){ this.site.removeFromCart(item.key); }
  isInCart(item:any){ return this.site.getCart().some(x=>x.key===item.key); }
  get total(){ return this.site.cartTotal(); }
}
