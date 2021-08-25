import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DataService } from 'src/app/data-service';
import { Contact } from 'src/app/models';
import { debounceTime, distinctUntilChanged, filter } from 'rxjs/operators';


@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent {
    @Input() selectedContact: any;
    @Output() signal = new EventEmitter();

    data: Contact[];
    contactPerPage: Contact[];
    limit: number;
    offset: number;
    searchFC: FormControl;

    constructor(private dataService: DataService) {
        this.data = [];
        this.selectedContact = null;
        this.contactPerPage = [];
        this.limit = 6;
        this.offset = 0;
        this.searchFC = new FormControl(null);
    }

    ngOnInit(): void {
        this.searchFC.valueChanges.pipe(debounceTime(400), distinctUntilChanged())
        .subscribe(search => {
            this.loadData(search);
        });

        this.loadData();
    }

    loadData(search = ''): void {
        this.offset = 0;

        this.dataService.getContacts().subscribe(resp => {
            this.data = resp;

            if (search != '') {
                let filteredData = this.data.filter((obj:any) => obj['name'].toLowerCase().includes(search.toLowerCase()));
                filteredData = filteredData.concat(this.data.filter((obj: any) => obj['phones'].some((phone: string) => phone.includes(search))));
                filteredData = filteredData.concat(this.data.filter((obj: any) => obj['emails'].some((email: string) => email.includes(search))));

                this.data = filteredData;
                this.contactPerPage = this.data.slice(this.offset, this.limit);
            }
            else this.contactPerPage = this.data.slice(this.offset, this.limit);
        });
    }

    onSelectContact(contact: Contact): void {
        this.signal.emit(contact);
    }

    moveRight(): void {
        this.offset += 6;
        this.contactPerPage = this.data.slice(this.offset, this.limit + this.offset);
    }

    moveLeft(): void {
        this.offset -= 6;
        this.contactPerPage = this.data.slice(this.offset, this.limit + this.offset);
    }
}
