import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-welcomeuser',
  templateUrl: './welcomeuser.component.html',
  styleUrls: ['./welcomeuser.component.css']
})
export class WelcomeuserComponent implements OnInit {

  constructor(private router: Router, private authService: AuthenticationService) { }

  ngOnInit(): void {
  }

  viewFlights(): void {
    this.router.navigate(['flights']);
  }

  viewBookings(): void {
    this.router.navigate(['bookings']);
  }
  bookFlight():void{
    this.router.navigate(["addBooking"])
  }

  logOut(): void {
    this.authService.logOut();
    this.router.navigate(['login']);
  }
}
