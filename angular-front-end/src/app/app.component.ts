import { Component, OnInit } from '@angular/core';
import { ApiService } from './services/api.service';
import { Person } from './models/person';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'httpGet Example';

  people: Person[] = [];
  person = new Person();

  error: string = "";
  errorMsg: string = "";
  errorHeight: number = 0;
  currentId: number = 0;

  errorInsert: any = {status: 0,msg: ''};
  isAddClicked = false;
  

  constructor(private service: ApiService) { }

  //casistica errori status http
  private switchCase(err: any): any {
    let ret = { status: err.status, msg: '' }
    switch (err.status) {
      case 400:
        ret.msg = 'Bad Request: '+ err.status;
        break;
      case 403:
        ret.msg = 'Forbidden: '+ err.status;
        break;
      case 404:
        ret.msg = 'User not found: '+ err.status;
        break;
      case 406:
        ret.msg = 'Campo vuoto: '+ err.status;
        break;
      case 500:
        ret.msg = 'Internal Server Error: ' + err.status;
        break;
      default:
        ret.msg = 'An error occurred: ' + err.status;
    }
    return ret;
  }




  //blocco numeri e caratteri speciali nell'input sulla tabella
  onlyChr(evt: KeyboardEvent) {
    if (evt.keyCode > 64 && evt.keyCode < 91) return true;
    else if (evt.keyCode > 96 && evt.keyCode < 123) return true;
    else if (evt.keyCode == 32) return true;
    return false;
    //debugger;
  }

  //al caricamento della pagina get()
  ngOnInit(): void {
    this.refreshPeople();
  }

  refreshPeople() {
    this.service.getPeople().subscribe({
      next: (data: Person[]) => {
        this.people = data;
      },
      error: (err: Error) => { 
        this.errorInsert = this.switchCase(err);
      },
      complete: () => {
      }
    });
  }

  //controllo sul campo input name => form
   addPerson(control: any) {
    /*
    if (control.invalid)
    {
      this.errorInsert 
      return;
    }
    */

    this.service.addPerson(control.name)
      .subscribe({
        next: () => {
          this.isAddClicked = true;
          this.refreshPeople();
          control.reset();
        },
        error: (err: HttpErrorResponse) => {
          this.errorInsert = this.switchCase(err); 
        },
        complete: () => {

        }
      });
      
  } 



//gestione dlla posizione dell'errore in base all'id
  clickTable(id, ele) {
    /*
    if (this.currentId != id) {
      this.currentId = id;
      this.error = "";
    }
    */
    this.error = "";
    this.errorHeight = ele.offsetTop;
    (<HTMLDivElement>document.querySelector("#error")).style.marginTop = "" + (this.errorHeight) + "px";
  }

  delPerson(id: number) {
    this.service.deletePerson(id).subscribe({
      next: () => {
        this.refreshPeople();
      },
      error: (err: any) => {
        this.error = "" + err.status;
      },
      complete: () => {
      }
    })
  }

  updPerson(person: Person) {
    if (person.name == "") {
      debugger;
      setTimeout(function(){
        this.error = "Error: parametro vuoto";
      },1000);
      return;
    }
   
    this.service.updatePerson(person).subscribe({
      next: () => {
      },
      error: (err: any) => {
        let res = this.switchCase(err);
        this.error = res.status;
        this.errorMsg = res.msg;
      },
      complete: () => {
      }
    });
  }


}
