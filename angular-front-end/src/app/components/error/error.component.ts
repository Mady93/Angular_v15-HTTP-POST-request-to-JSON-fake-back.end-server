import { Component, OnInit } from '@angular/core';
import { HttpBackend, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit{
  
  serverStatus: boolean = false;
  isFirstLoad: boolean = true;
  isRefreshing: boolean = false;

  constructor(private httpClient: HttpClient,private router: Router){
   
  }

   counter(n: number): number[] {
    return Array(n);
  } 

   ngOnInit(): void {
      this.checkServerStatus();
  }

  checkServerStatus(): void {
    // Eseguo una chiamata al server per verificare lo stato
    this.httpClient.get('http://localhost:3000/people').subscribe({
      next: () => {
        // Se la chiamata ha successo, il server è nuovamente accessibile
        this.router.navigate(['/home']);
      },
      error: () => {
        
      }
    });
  } 

}
