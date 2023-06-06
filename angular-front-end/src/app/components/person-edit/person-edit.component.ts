import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Person } from 'src/app/models/person';
import { Router } from '@angular/router';

@Component({
  selector: 'app-person-edit',
  templateUrl: './person-edit.component.html',
  styleUrls: ['./person-edit.component.css']
})
export class PersonEditComponent implements OnInit{

  constructor(private router: Router, private service: ApiService, private route: ActivatedRoute, private formBuilder: FormBuilder){}


  id?: number;
  form: FormGroup;
  


  ngOnInit(): void {

    

    this.route.params.subscribe(params => {
      this.id = params["id"];
    });


    if (this.id != null)
    {
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


  getFirstName()
  {
    return this.form.get("firstname");
  }

  getLastName()
  {
    return this.form.get("lastname");
  }

  getEmail()
  {
    return this.form.get("email");
  }



  submit(form: FormGroup) {
    form.value["id"] = this.id;
    this.service.updatePerson(form.value).subscribe({
      next: () => {
        if (window.confirm("Are you sure you want to update this person?")) {
          this.router.navigate(["/person-list"]);
        }
      },
      error: (err: any) => {
  
      }
    });
  }



}
