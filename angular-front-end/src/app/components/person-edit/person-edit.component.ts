import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Person } from 'src/app/models/person';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-person-edit',
  templateUrl: './person-edit.component.html',
  styleUrls: ['./person-edit.component.css']
})
export class PersonEditComponent implements OnInit {

  id?: number;
  form: FormGroup;
  error: any;

  constructor(private router: Router, private service: ApiService, private route: ActivatedRoute, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    //ottengo il valore del parametro "id" dell'URL => sempre aggiornato
    this.route.params.subscribe(params => {
      this.id = params["id"];
     
      /* const params = this.route.snapshot.params;
          this.id = params["id"]; */
    });

    if (this.id != null) {
      this.service.getPersonById(this.id).subscribe({
        next: (person: Person[]) => {
          //debugger;
          this.form.controls["firstname"].setValue(person[0].firstname);
          this.form.controls["lastname"].setValue(person[0].lastname);
          this.form.controls["email"].setValue(person[0].email);
        }
      })
    }

    this.form = this.formBuilder.group({
      firstname: ['', [Validators.required, Validators.pattern("[a-zA-Z\s]+$"), Validators.minLength(2)]],
      lastname: ['', [Validators.required, Validators.pattern("[a-zA-Z\s]+$"), Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.pattern("^.*@[a-zA-Z]+\..*$")]]
    })
  }

  getFirstName() {
    return this.form.get("firstname");
  }

  getLastName() {
    return this.form.get("lastname");
  }

  getEmail() {
    return this.form.get("email");
  }

  /*  la finestra di conferma verrà mostrata prima di eseguire l'operazione
   di aggiornamento. Se l'utente conferma, verrà eseguito il codice all'interno
    del blocco if e l'operazione di navigazione verso "/person-list" verrà eseguita.
     Altrimenti, se l'utente annulla, il codice nel blocco if verrà ignorato e 
     l'operazione di aggiornamento non verrà eseguita. */

  submit(form: FormGroup) {
    form.value["id"] = this.id;

    if (window.confirm("Are you sure you want to update this person?")) {
      this.service.updatePerson(form.value).subscribe({
        next: () => {
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

}
