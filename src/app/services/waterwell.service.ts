import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import "rxjs/add/operator/map";

@Injectable()
export class WaterwellService {
  private url: string;

  constructor(private http: Http) {
    // TODO: set back to localhost
    this.url = "http://192.168.0.209:8000/api/waterwell/";
  }

  getLastMeasurement() {
    return this.http.get(this.url + "last").map(res => res.json());
  }

  getDataBetweenPeriods(start, end) {}
}
