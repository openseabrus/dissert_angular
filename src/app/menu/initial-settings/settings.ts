export class Settings {
	_id?: string;
	min_zoom: number;
	max_zoom: number;
	init_zoom: number;

	init_theme: string;
	init_center: {
		latitude: number;
		longitude: number;
	};

	start_adapting: boolean;
	update_interval: number;
	app_theme: string;
	toolbar_title: string;
}
