import { CommonModule } from '@angular/common'; import { Component } from '@angular/core'; import { FormsModule } from '@angular/forms';
@Component({selector:'app-signup',imports:[CommonModule,FormsModule],templateUrl:'./signup.html',styleUrl:'./signup.css'}) export class SignUp {submitted=false;email='';password='';submit(){this.submitted=true}}
