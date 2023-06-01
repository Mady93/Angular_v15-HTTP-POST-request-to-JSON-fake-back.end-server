import { Component, OnInit } from '@angular/core';
import { ApiService } from './services/api.service';
import { Person } from './models/person';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'httpGet Example';

  people: Person[]=[];
  person = new Person();


  constructor(private service: ApiService) { }

  ngOnInit(): void {
    this.refreshPeople();
  }


  refreshPeople() {

    this.service.getPeople().subscribe(data => {
      this.people = data
    }, err => {
      alert("error "+err.message);
    });
  }


  addPerson() {
    this.service.addPerson(this.person)
      .subscribe(data => {
        this.refreshPeople();
      });
  }
}
