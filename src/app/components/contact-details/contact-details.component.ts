import { Component, Input, OnInit } from '@angular/core';


@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.scss']
})
export class ContactDetailsComponent implements OnInit {
    @Input() selectedContact: any;

    constructor() {
        this.selectedContact = null;
    }

    ngOnInit(): void {
    }
}
