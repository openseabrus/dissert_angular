import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { DatabaseLinkService } from './database-link.service';
import { DatabaseLink } from './database-link';

@Component({
  selector: 'app-database-link',
  templateUrl: './database-link.component.html',
  styleUrls: ['./database-link.component.css']
})
export class DatabaseLinkComponent implements OnInit {

  private databaseUrl: string;
  private linkform: FormGroup;
  private URL_PATTERN = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';

  constructor(private databaseService: DatabaseLinkService) {}

  ngOnInit() {
    this.databaseUrl = '';
  }


  private submitURL() {
    this.databaseService.setDatabase(new DatabaseLink(new URL(this.databaseUrl))).subscribe();
  }

}
