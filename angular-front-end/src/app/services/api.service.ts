import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Person } from '../models/person';
import { Injectable } from '@angular/core';
import { Observable, catchError, map } from 'rxjs';


@Injectable({ providedIn: 'root' })
export class ApiService {

    baseURL: string = "http://localhost:3000/";


    constructor(public http: HttpClient) { }

    /* getPeople(): Observable<Person[]> {
        return this.http.get<Person[]>(`${this.baseURL}people`);
      } */

    getPeople(): Observable<Person[]> {
        return this.http.get<Person[]>(this.baseURL + 'people').pipe(
            catchError((err) => {
                console.error(err);
                throw err;
            }),
        )
    }; 
    

    //Risposta completa
    /* addPerson(person: Person): Observable<any> {
        const headers = { 'content-type': 'application/json' }
        const body = JSON.stringify(person);

        return this.http.post(this.baseURL + 'people', body, {
            'headers': headers, observe:'response'
        })
    } */

    //Ascoltare gli eventi di avanzamento con { observe: 'events', reportProgress: true }
    /* addPerson(person: Person): Observable<any> {
        const headers = { 'content-type': 'application/json' }
        const body = JSON.stringify(person);

        return this.http.post(this.baseURL + 'people', 
        body,{'headers':headers, observe: 'response',reportProgress: true
        });
    } */

    //Risposta fortemente tipizzata
    /*  addPerson(person: Person): Observable<Person> {
      const headers = { 'content-type': 'application/json' }
      const body = JSON.stringify(person);
      console.log(body)
      return this.http.post<Person>(this.baseURL + 'people', body, { 'headers': headers })
  } */

    //Stringa come tipo di risposta
    /*  addPerson(person: Person): Observable<Person> {
        const headers = { 'content-type': 'application/json' };
        const body = JSON.stringify(person);

        return this.http.post<Person>(this.baseURL + 'people', body, {
            headers: headers, responseType: "text"
        });
    }  */

    /* serializzazione dell'oggetto person in una stringa JSON nel corpo della richiesta 
         e la risposta JSON restituita dal server viene automaticamente interpretata come
            un oggetto JavaScript grazie all'impostazione di responseType : "json" */
    /* addPerson(person: Person): Observable<Person> {
       const headers = { 'content-type': 'application/json' };
       const body = JSON.stringify(person);

       return this.http.post<Person>(this.baseURL + 'people', body, {
           headers: headers, responseType: "json"
       });
   }  */



    //GESTIONE DEGLI ERRORI:



    //manda l'errore al componente attraverso throw err
      addPerson(person: Person): Observable<Person> {
         const headers = { 'content-type': 'application/json' }
         const body = JSON.stringify(person);
 
         return this.http.post<Person>(this.baseURL + 'people', body, { 'headers': headers }).pipe(
             catchError((err) => {
                 console.error(err);
                 throw err;
             }),
         )
     }; 


    // map per trasformare i valori della risposta
    /* addPerson(person: Person): Observable<Person> {
        const headers = { 'content-type': 'application/json' }
        const body = JSON.stringify(person);

        return this.http.post<Person>(this.baseURL + 'people', body, { 'headers': headers }).pipe(
            map((data:Person) => {
                data.name = data.name.toUpperCase();
                data.id = data.id * 2;
                return data;
            }),
            catchError((err) => {
                console.error(err);
                throw err;
            }),
        )
    }
 */



    /*                                        Query paramiter:
    Invia una richiesta GET all'URL http://localhost:3000/people?id=person.id&name=person.name*/
    /*     addPerson(person: Person): Observable<Person> {
            const headers = { 'content-type': 'application/json' };
            const params = new HttpParams()
                .set('id', person.id)
                .set('name', person.name);
            const body = JSON.stringify(person);
    
            return this.http.post<Person>(this.baseURL + 'people', body, {
                'headers': headers,
                'params': params
            });
        } */


    /*                    Query paramiter modo alternativo:
    Invia una richiesta GET all'URL http://localhost:3000/people?id=person.id&name=person.name*/
    /* addPerson(person: Person): Observable<Person> {
        const headers = { 'content-type': 'application/json' };
        const body = JSON.stringify(person);
        
        return this.http.post<Person>
        (this.baseURL + 'people?id=person.id&name=person.name', body, { 'headers': headers });
    } */
    


}

