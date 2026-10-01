import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { SiteData } from '../../services/site-data';
import { RouterLink } from '@angular/router';
@Component({selector:'app-articles',imports:[CommonModule,RouterLink],templateUrl:'./articles.html',styleUrl:'./articles.css'})
export class Articles implements OnInit {
 items:any[]=[]; selected:any; constructor(private site:SiteData){}
 async ngOnInit(){this.items=(await this.site.getData()).articles}
 open(x:any){this.selected=x}
 close(){this.selected=null}
 get related(){return this.selected ? this.items.filter(x=>x.category===this.selected.category && x.id!==this.selected.id).slice(0,3):[]}
}
