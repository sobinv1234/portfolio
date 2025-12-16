import { Routes } from '@angular/router';

export const routes: Routes = [
	{
		path: '',
		loadComponent: () => import('./home/home.component').then(m => m.HomeComponent)
	},
	{
		path: 'contact',
		loadComponent: () => import('./contact/contact.component').then(m => m.ContactComponent)
	}
];
