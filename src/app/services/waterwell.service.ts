import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import "rxjs/add/operator/map";

@Injectable()
export class WaterwellService {
  private url: string;

  constructor(private http: Http) {
    this.url = "http://localhost:8000/api/waterwell/";
  }

  getLastMeasurement() {
    return this.http.get(this.url + "last").map(res => res.json());
  }
}
