import { Component, OnInit } from '@angular/core';
import { Settings } from './settings';
import { SettingsService } from 'src/app/services/settings-service.service';

@Component({
	selector: 'app-initial-settings',
	templateUrl: './initial-settings.component.html',
	styleUrls: ['./initial-settings.component.css']
})
export class InitialSettingsComponent implements OnInit {

	private settings: Settings;

	constructor(private settingsService: SettingsService) { }

	ngOnInit() {
		this.settings = new Settings();
		this.settingsService.getSettings().subscribe(sets => this.settings = sets);
	}

	private submitSettings() {
		this.settingsService.newSettings(this.settings).subscribe();
	}
}
