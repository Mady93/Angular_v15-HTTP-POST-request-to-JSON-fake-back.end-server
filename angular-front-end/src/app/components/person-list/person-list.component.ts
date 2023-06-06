import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Person } from 'src/app/models/person';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.css']
})
export class PersonListComponent implements OnInit {

  people: Person[] = [];
  error: any;

  constructor(private service: ApiService) {

  }


  ngOnInit(): void {
    this.getPeople();
  }


  getPeople() {
    this.service.getPeople().subscribe({
      next: (res) => {
        this.people = res;
      },
      error: (err: HttpErrorResponse) => {
        this.error = err;
      },
      complete: () => {
        console.log('complete');
      }
    })
  }

  deleteById(id: number) {
    this.service.deletePerson(id).subscribe({
      next: () => {
        this.getPeople();
      }
    })
  }

}
