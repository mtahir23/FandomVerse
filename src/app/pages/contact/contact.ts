import { CommonModule } from '@angular/common'; import { Component } from '@angular/core'; import { FormsModule } from '@angular/forms'; import { SafeUrlPipe } from '../../pipes/safe-url';
@Component({selector:'app-contact',imports:[CommonModule,FormsModule,SafeUrlPipe],templateUrl:'./contact.html',styleUrl:'./contact.css'})
export class Contact { sent=false; name=''; email=''; message=''; gpsStatus=''; mapUrl='https://www.google.com/maps?q=24.8607,67.0011&output=embed';
 submit(){this.sent=true}
 useMyLocation(){ if(!navigator.geolocation){this.gpsStatus='Geolocation is not supported by this browser.';return;} this.gpsStatus='Requesting your location...'; navigator.geolocation.getCurrentPosition(pos=>{const {latitude,longitude}=pos.coords;this.mapUrl=`https://www.google.com/maps?q=${latitude},${longitude}&output=embed`;this.gpsStatus=`Location loaded: ${latitude.toFixed(4)}, ${longitude.toFixed(4)}`},()=>this.gpsStatus='Location permission was denied or unavailable.'); }
}
