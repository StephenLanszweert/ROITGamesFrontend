import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { Observable } from "rxjs";
import { Measurement } from "../models/measurement";
import { UsageSummary } from "../models/usageSummary";

@Injectable()
export class WaterwellService {
  private url: string;

  constructor(private http: HttpClient) {
    this.url = "https://hectorfuzzy.duckdns.org/riot-api/api/waterwell";
  }

  getLastMeasurement(): Observable<Measurement> {
    return this.http
      .get(this.url + "/last")
      .pipe(map(res => res as Measurement));
  }

  getAll(): Observable<Measurement[]> {
    const initDate = new Date(2018, 6, 21);
    const timePartUrl = `?end=${initDate.toISOString()}`;
    return this.http
      .get(this.url + timePartUrl)
      .pipe(map(res => res as Measurement[]));
  }

  getDataBetweenPeriods(start: Date, end: Date): Observable<Measurement[]> {
    let timePartUrl = "";

    if (end == null) {
      const initDate = new Date(2018, 6, 21);
      timePartUrl = `?end=${initDate.toISOString()}`;
    } else {
      timePartUrl = `?end=${end.toISOString()}&start=${start.toISOString()}`;
    }

    return this.http
      .get(this.url + timePartUrl)
      .pipe(map(res => res as Measurement[]));
  }

  getUsageSummaryThisWeek(): Observable<UsageSummary> {
    function getMonday(date) {
      const day = date.getDay() || 7;
      if (day !== 1) date.setHours(-24 * (day - 1));

      date.setHours(0);
      date.setMinutes(0);
      date.setSeconds(0);
      date.setMilliseconds(0);

      console.log(date);

      return date;
    }

    const now = new Date().toISOString();
    const beginningOfTheWeek = getMonday(new Date()).toISOString();

    return this.http
      .get(`${this.url}/summarized?start=${now}&end=${beginningOfTheWeek}`)
      .pipe(map(res => res as UsageSummary));
  }
}
