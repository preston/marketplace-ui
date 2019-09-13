import { Injectable } from "@angular/core";
import { HttpClient, HttpParams, HttpEventType } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { BaseService } from "../base/base.service";

import { BackendService } from '../backend/backend.service';
import { Product } from '../product/product';
import { License } from '../license/license';
import { User } from '../user/user';

@Injectable()
export class ProductService extends BaseService {


	public static PATH: string = '/products';
	public static SEARCH_PATH: string = '/products/search';

	constructor(backendService: BackendService, http: HttpClient) {
		super(backendService, http);
	}

	url(): string {
		return this.backendService.getUrl() + ProductService.PATH;
	}

	searchUrl(): string {
		return this.backendService.getUrl() + ProductService.SEARCH_PATH;
	}

	// search(text: string) {
	//     // let products = this.http.post<Product[]>(this.searchUrl(), { text: text }, {headers: this.headers()}).pipe(map(res => res));
	//     return this.search(text, "1");
	// }

	search(text: string, page: string = "1") {
		let products = this.http.post<Product[]>(this.searchUrl(), { text: text, page: page }, { headers: this.headers() }).pipe(map(res => res));
		return products;
	}

	searchPublished(text: string, mimeTypes: string[]) {
		let types = mimeTypes.join(',');
		// let params = new HttpParams().set('published', 'true').set('mime_type', types);
		let products = this.http.post<Product[]>(this.searchUrl(), { text: text, published: true, mime_type: types }, { headers: this.headers() }).pipe(map(res => res));
		return products;
	}

	searchUnpublished(text: string, mimeTypes: string[]) {
		let types = mimeTypes.join(',');
		let products = this.http.post<Product[]>(this.searchUrl(), { text: text, published: false, mime_type: types }, { headers: this.headers() }).pipe(map(res => res));
		return products;
	}

	index() {
		let products = this.http.get<Product[]>(this.url(), { headers: this.headers() }).pipe(map(res => res));
		return products;
	}

	parents(product: Product, page: string) {
		let params = new HttpParams().set('page', page);
		let products = this.http.get<Product[]>(this.url() + '/' + product.id + '/parents', { headers: this.headers(), params: params }).pipe(map(res => res));
		return products;
	}

	children(product: Product, page: string) {
		let params = new HttpParams().set('page', page);
		let products = this.http.get<Product[]>(this.url() + '/' + product.id + '/children', { headers: this.headers(), params: params }).pipe(map(res => res));
		return products;
	}


	indexByLicense(license: License) {
		let products = this.http.get<Product[]>(this.url() + '?license_id=' + license.id, { headers: this.headers() }).pipe(map(res => res));
		return products;
	}

	indexByUser(user: User) {
		let products = this.http.get<Product[]>(this.url() + '?user_id=' + user.id, { headers: this.headers() }).pipe(map(res => res));
		return products;
	}

	published(mimeTypes: string[]) {
		// FIXME bug: https://github.com/angular/angular/issues/24754
		let types = mimeTypes.join(',')//.replace('+', '%2B');
		// let products = this.http.get<Product[]>(this.url() + '?published=true&mime_type=' + types, {headers: this.headers()}).pipe(map(res => res));
		let products = this.http.get<Product[]>(this.url(), { headers: this.headers(), params: { 'published': 'true', 'mime_type': types } }).pipe(map(res => res));
		return products;
	}

	unpublished(mimeTypes: string[]) {
		let types = mimeTypes.join(',');
		let products = this.http.get<Product[]>(this.url() + '?published=false&mime_type=' + types, { headers: this.headers() }).pipe(map(res => res));
		return products;
	}

	get(id: string) {
		let service = this.http.get<Product>(this.url() + '/' + id, { headers: this.headers() }).pipe(map(res => res));
		return service;
	}

	create(product: Product) {
		let obs = this.http.post<Product>(this.url(), { 'product': product }, { headers: this.headers() }).pipe(map(res => res));
		return obs;
	}

	update(product: Product) {
		let fd = new FormData();
		fd.set('product[name]', product.name);
		fd.set('product[description]', product.description);
		fd.set('product[external_id]', product.external_id);
		fd.set('product[mime_type]', product.mime_type);
		fd.set('product[uri]', product.uri);
		fd.set('product[support_url]', product.support_url);
		if (product.logo) {
			fd.set('product[logo]', product.logo, product.logo.name);
		}
		let obs = this.http.put<Product>(this.url() + '/' + product.id, fd, { headers: this.headers() }).pipe(map(res => res));
		return obs;
	}

	// updateLogo(product: Product, file: File) {
	// 	let fd = new FormData();
	// 	fd.set('logo', file, file.name);
	// 	this.http.post(this.url() + '/' + product.id + '/logo', { reportProgress: true, observe: 'events' }).subscribe(event => {
	// 		if (event.type === HttpEventType.UploadProgress) {
	// 			console.log('Upload progress: ' + Math.round(100 * event.loaded / event.total) + '%');
	// 		} else if(event.type === HttpEventType.Response) {
	// 			console.log("Response: " + event);
	// 		}
	// 	}

	// 	)
	// }


	delete(product: Product) {
		let obs = this.http.delete<Product>(this.url() + '/' + product.id, { headers: this.headers() }).pipe(map(res => res));
		return obs;
	}

	publish(product: Product) {
		let obs = this.http.post<Product>(this.url() + '/' + product.id + '/publish', {}, { headers: this.headers() }).pipe(map(res => res));
		return obs;
	}

	unpublish(product: Product) {
		let obs = this.http.post<Product>(this.url() + '/' + product.id + '/unpublish', {}, { headers: this.headers() }).pipe(map(res => res));
		return obs;
	}

}
