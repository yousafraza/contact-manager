import { Component } from '@angular/core';
import { Contact } from './models';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
    selectedContact: any;

    constructor() {
        this.selectedContact = null;
    }

    onSelectContact(contact: Contact): void {
        this.selectedContact = contact;
    }
}
