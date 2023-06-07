import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Person } from 'src/app/models/person';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-person-create',
  templateUrl: './person-create.component.html',
  styleUrls: ['./person-create.component.css']
})
export class PersonCreateComponent implements OnInit {

  person: Person;
  error: any;

  constructor(private router: Router, private service: ApiService) { }

  ngOnInit(): void {
    this.person = {
      id: null,
      firstname: "",
      lastname: "",
      email: ""
    };
  }

  addPerson(form: NgForm) {
    
    if (form.invalid)
      return;

    this.service.addPerson(form.value)
      .subscribe({
        next: () => {
          form.reset();
          this.router.navigate(["/person-list"]);
        },
        error: (err: HttpErrorResponse) => {
          this.error = err;
        },
        complete: () => {
          console.log('complete');
        }
      });
  }

}
