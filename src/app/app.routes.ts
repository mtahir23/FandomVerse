import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { Anime } from './components/anime/anime';
import { Gaming } from './components/gaming/gaming';
import { Movies } from './components/movies/movies';
import { TvShows } from './components/tv-shows/tv-shows';
import { KPop } from './components/k-pop/k-pop';
import { Comics } from './components/comics/comics';
import { Manga } from './components/manga/manga';
import { Search } from './components/search/search';
import { Media } from './pages/media/media';
import { Articles } from './pages/articles/articles';
import { Events } from './pages/events/events';
import { Trailers } from './pages/trailers/trailers';
import { Releases } from './pages/releases/releases';
import { Merchandise } from './pages/merchandise/merchandise';
import { Bookmarks } from './pages/bookmarks/bookmarks';
import { About } from './pages/about/about';
import { Contact } from './pages/contact/contact';
import { Chatbot } from './pages/chatbot/chatbot';
import { Login } from './pages/login/login'; import { SignUp } from './pages/signup/signup';
export const routes: Routes = [
 {path:'',component:Home},{path:'anime',component:Anime},{path:'gaming',component:Gaming},{path:'movies',component:Movies},{path:'tv-shows',component:TvShows},{path:'k-pop',component:KPop},{path:'comics',component:Comics},{path:'manga',component:Manga},{path:'search',component:Search},
 {path:'media',component:Media},{path:'articles',component:Articles},{path:'events',component:Events},{path:'trailers',component:Trailers},{path:'releases',component:Releases},{path:'merchandise',component:Merchandise},{path:'bookmarks',component:Bookmarks},{path:'about',component:About},{path:'contact',component:Contact},{path:'chatbot',component:Chatbot},{path:'login',component:Login},{path:'signup',component:SignUp},
 {path:'**',redirectTo:''}
];
