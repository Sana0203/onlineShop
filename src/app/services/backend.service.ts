import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  server = "http://localhost:5152/";
  http = inject(HttpClient);
  get(url: string){
    return this.http.get(this.server + url);
  }
  post(url: string, data: any){
    return this.http.post(this.server + url, data);
  }
  put(url: string, data: any){
    return this.http.put(this.server + url, data);
  }
  delete(url: string){
    return this.http.delete(this.server + url);
  }
}
