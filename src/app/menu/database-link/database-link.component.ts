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
  private currentUrl: DatabaseLink;

  constructor(private databaseService: DatabaseLinkService) {}

  ngOnInit() {
    this.databaseUrl = '';
    this.databaseService.getDatabase().subscribe(res => {
      if (res.body == null || res.status === 204) {
        this.currentUrl = null;
      } else if (res.status === 200) {
        this.currentUrl = new DatabaseLink(res.body.link, res.body.setDate);
      }
    }, err => {
      console.log('Error fetching database.', err);
    });
  }


  private submitURL() {
    this.databaseService.setDatabase(new DatabaseLink(new URL(this.databaseUrl))).subscribe(res => {
      location.reload();
    });
  }

}
