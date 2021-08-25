import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Contact } from './models';

@Injectable({providedIn: 'root'})
export class DataService {
    contacts: Contact[];

    constructor(private http: HttpClient) {
        this.contacts = []
    }
    
    getContacts(): Observable<any> {
        return this.http.get('/assets/contacts.json').pipe(catchError(this.handleError));
    }

    public handleError(error: any): any
    {
        if (error.status === 401 || error.ErrorCode === 401)
        {
            return error;
        }

        if (error instanceof HttpErrorResponse)
        {
            const e = {
                Status: 'Error',
                ErrorCode: error.status,
                ErrorMessage: error.statusText
            };

            error = e;
        }

        return error;
    }
}