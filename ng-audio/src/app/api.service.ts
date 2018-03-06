import { Injectable } from '@angular/core';
import { Http, RequestOptions, URLSearchParams } from '@angular/http';

@Injectable()
export class ApiService {
  url = '';
  baseUrl = '';
  constructor(public http: Http) {
  }
  get(api: string, params?: any, options?: RequestOptions) {
    if (!options) {
      options = new RequestOptions();
    }
    if (params) {
      const p = new URLSearchParams();
      for (const k of params) {
        p.set(k, params[k]);
      }
      options.search = !options.search && p || options.search;
      // options.withCredentials = true;
    }

    // return this.http.get(this.baseUrl + this.url + '/' + api, options);
    return new Promise((resolve, reject) => {
      this.http.get(this.baseUrl + this.url + '/' + api, options).toPromise().then((res) => {
        const resp = {};
        resp['body'] = res.json();
        resp['header'] = res.headers.toJSON();
        resolve(resp);
      }).catch((error) => {
        console.log(error);
        resolve(error);
      });
    });
  }
  post(api: string, body: any, options?: RequestOptions) {
    return this.http.post(this.baseUrl + this.url + '/' + api, body, options);
  }
}
