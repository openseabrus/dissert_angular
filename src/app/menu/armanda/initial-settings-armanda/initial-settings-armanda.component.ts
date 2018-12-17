import { Component, OnInit } from '@angular/core';
import { SettingsService } from 'src/app/services/settings-service.service';
import { Settings } from '../../initial-settings/settings';

@Component({
	selector: 'app-initial-settings-armanda',
	templateUrl: './initial-settings-armanda.component.html',
	styleUrls: ['./initial-settings-armanda.component.css']
})
export class InitialSettingsArmandaComponent implements OnInit {

	private settings: Settings;

	constructor(private settingsService: SettingsService) { }

	ngOnInit() {
		this.settings = new Settings();
		this.settingsService.getSettings(true).subscribe(sets => this.settings = sets);
	}

	private submitSettings() {
		this.settingsService.newSettings(this.settings, true).subscribe();
	}
}
