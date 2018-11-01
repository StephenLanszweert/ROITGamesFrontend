import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import "rxjs/add/operator/map";

@Injectable()
export class WaterwellService {
  private url: string;

  constructor(private http: Http) {
    // TODO: set back to 192.168.0.209 for testing in network
    this.url = "http://localhost:8000/api/waterwell";
  }

  getLastMeasurement() {
    return this.http.get(this.url + "/last").map(res => res.json());
  }

  getAll() {
    let initDate = new Date(2018, 6, 21);
    let timePartUrl = `?end=${initDate.toISOString()}`;
    return this.http.get(this.url + timePartUrl).map(res => {
      return res.json();
    });
  }

  getDataBetweenPeriods(start: Date, end: Date) {
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
    return this.http.get(this.url + timePartUrl).map(res => {
      return res.json();
    });
  }
}
