import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { map } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable()
export class WaterwellService {
  private url: string;

  constructor(private http: HttpClient) {
    // TODO: set back to 192.168.0.209 for testing in network
    this.url = "http://localhost:8000/api/waterwell";
  }

  getLastMeasurement() {
    return this.http.get(this.url + "/last");
  }

  getAll() {
    let initDate = new Date(2018, 6, 21);
    let timePartUrl = `?end=${initDate.toISOString()}`;
    return this.http.get(this.url + timePartUrl);
  }

  getDataBetweenPeriods(start: Date, end: Date): Observable<any> {
    let timePartUrl = "";
    console.log(start);
    if (end == null) {
      // TODO: change date to init date(first recording)
      let initDate = new Date(2018, 6, 21);
      timePartUrl = `?end=${initDate.toISOString()}`;
    } else {
      timePartUrl = `?end=${end.toISOString()}&start=${start.toISOString()}`;
    }
    console.log(timePartUrl);
    return this.http.get(this.url + timePartUrl);
  }
}
