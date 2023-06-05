import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Person } from '../models/person';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';


@Injectable({ providedIn: 'root' })
export class ApiService {

    baseURL: string = "http://localhost:3000/";


    constructor(public http: HttpClient) { }

    /* getPeople(): Observable<Person[]> {
        return this.http.get<Person[]>(`${this.baseURL}people`);
      } */
    getPeople(): Observable<Person[]> {
        return this.http.get<Person[]>(this.baseURL + 'people').pipe(
            catchError((err: HttpErrorResponse): Observable<Person[]> => {
                switch (err.status) {
                    case 404:
                        return throwError(() => new Error('User not found: ' + err.status));
                    case 401:
                        return throwError(() => new Error('Unauthorized: ' + err.status));
                    case 403:
                        return throwError(() => new Error('Forbidden: ' + err.status));
                    case 500:
                        return throwError(() => new Error('Internal Server Error: ' + err.status));
                    default:
                        return throwError(() => new Error('An error occurred: ' + err.status));
                }
            }),
        );
    }





    //                        Risposta completa
    /* addPerson(person: Person): Observable<any> {
        const headers = { 'content-type': 'application/json' }
        const body = JSON.stringify(person);

        return this.http.post(this.baseURL + 'people', body, {
            'headers': headers, observe:'response'
        })
    } */

    //         Ascoltare gli eventi di avanzamento con { observe: 'events', reportProgress: true }
    /* addPerson(person: Person): Observable<any> {
        const headers = { 'content-type': 'application/json' }
        const body = JSON.stringify(person);

        return this.http.post(this.baseURL + 'people', 
        body,{'headers':headers, observe: 'response',reportProgress: true
        });
    } */

    //                      Risposta fortemente tipizzata
    /*  addPerson(person: Person): Observable<Person> {
      const headers = { 'content-type': 'application/json' }
      const body = JSON.stringify(person);
      console.log(body)
      return this.http.post<Person>(this.baseURL + 'people', body, { 'headers': headers })
  } */

    //                    Stringa come tipo di risposta
    /*  addPerson(person: Person): Observable<Person> {
        const headers = { 'content-type': 'application/json' };
        const body = JSON.stringify(person);

        return this.http.post<Person>(this.baseURL + 'people', body, {
            headers: headers, responseType: "text"
        });
    }  */

    /*      serializzazione dell'oggetto person in una stringa JSON nel corpo della richiesta 
            e la risposta JSON restituita dal server viene automaticamente interpretata come
            un oggetto JavaScript grazie all'impostazione di responseType : "json" */
    /* addPerson(person: Person): Observable<Person> {
       const headers = { 'content-type': 'application/json' };
       const body = JSON.stringify(person);

       return this.http.post<Person>(this.baseURL + 'people', body, {
           headers: headers, responseType: "json"
       });
   }  */


    //                             GESTIONE DEGLI ERRORI:


    //                  manda l'errore al componente attraverso throw err
    addPerson(name: string): Observable<Person> {
        const headers = { 'content-type': 'application/json' }
        const body = JSON.stringify({ name: name });

        if (name=="" || name==undefined || name==null)
        {
            return throwError(() => new HttpErrorResponse({status: 406, statusText: "campo vuoto"}));
        }

        return this.http.post<Person>(this.baseURL + 'people', body, { 'headers': headers }).pipe(
            catchError((error: HttpErrorResponse) => {
                switch (error.status) {
                    case 404:
                        return throwError(() => new Error('User not found: ' + error.status));
                    case 401:
                        return throwError(() => new Error('Unauthorized: ' + error.status));
                    case 403:
                        return throwError(() => new Error('Forbidden: ' + error.status));
                    case 500:
                        return throwError(() => new Error('Internal Server Error: ' + error.status));
                    default:
                        return throwError(() => new Error('An error occurred: ' + error.status));
                }
            }),
        );
    };







    //                      map per trasformare i valori della risposta
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

    /*                                        Query param:
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

    /*                       Query param modo alternativo:
    Invia una richiesta GET all'URL http://localhost:3000/people?id=person.id&name=person.name*/
    /* addPerson(person: Person): Observable<Person> {
        const headers = { 'content-type': 'application/json' };
        const body = JSON.stringify(person);
        
        return this.http.post<Person>
        (this.baseURL + 'people?id=person.id&name=person.name', body, { 'headers': headers });
    } */

    deletePerson(id: number): Observable<void> {

        return this.http.delete<void>(`${this.baseURL}people/${id}`).pipe(
            catchError((error: HttpErrorResponse) => {
                switch (error.status) {
                    case 404:
                        return throwError(() => new Error('User not found: ' + error.status));
                    case 401:
                        return throwError(() => new Error('Unauthorized: ' + error.status));
                    case 403:
                        return throwError(() => new Error('Forbidden: ' + error.status));
                    case 500:
                        return throwError(() => new Error('Internal Server Error: ' + error.status));
                    default:
                        return throwError(() => new Error('An error occurred: ' + error.status));
                }
            }),
        );
    }

    updatePerson(person: Person): Observable<void> {
        const headers = { 'content-type': 'application/json' };
        const body = JSON.stringify({ name: person.name });
        const addr = this.baseURL + 'people/' + person.id;
        return this.http.put<void>(addr, body, { headers: headers }).pipe(
            catchError((error: HttpErrorResponse) => {
                switch (error.status) {
                    case 404:
                        return throwError(() => new Error('User not found: ' + error.status));
                    case 401:
                        return throwError(() => new Error('Unauthorized: ' + error.status));
                    case 403:
                        return throwError(() => new Error('Forbidden: ' + error.status));
                    case 500:
                        return throwError(() => new Error('Internal Server Error: ' + error.status));
                    default:
                        return throwError(() => new Error('An error occurred: ' + error.status));
                }
            }),
        );
    }

}

