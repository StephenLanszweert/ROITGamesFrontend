import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {Measurement} from '../models/measurement';
import { UsageSummary } from '../models/usageSummary';

@Injectable()
export class WaterwellService {
    private url: string;

    constructor(private http: HttpClient) {
        // TODO: set back to 192.168.0.209 for testing in network
        this.url = 'http://hectorfuzzy.duckdns.org:6001/api/waterwell';
    }

    getLastMeasurement(): Observable<Measurement>  {
        return this.http.get(this.url + '/last').pipe(map(res => res as Measurement));
    }

    getAll(): Observable<Measurement[]> {
        const initDate = new Date(2018, 6, 21);
        const timePartUrl = `?end=${initDate.toISOString()}`;
        return this.http.get(this.url + timePartUrl).pipe(map(res => res as Measurement[]));
    }

    getDataBetweenPeriods(start: Date, end: Date): Observable<Measurement[]> {
        let timePartUrl = '';

        if (end == null) {
            // TODO: change date to init date(first recording)
            const initDate = new Date(2018, 6, 21);
            timePartUrl = `?end=${initDate.toISOString()}`;
        } else {
            timePartUrl = `?end=${end.toISOString()}&start=${start.toISOString()}`;
        }

        return this.http.get(this.url + timePartUrl).pipe(map(res => res as Measurement[]));
    }

    getUsageSummaryThisWeek(): Observable<UsageSummary>{
        function getMonday(d) {
            d = new Date(d);
            var day = d.getDay(),
                diff = d.getDate() - day + (day == 0 ? -6:1); // adjust when day is sunday
            return new Date(d.setDate(diff));
          }

        const now = new Date().toISOString();
        const beginningOfTheWeek = getMonday(new Date()).toISOString();

        console.log(`${this.url}/summarized?end=${now}&start=${beginningOfTheWeek}`);

        return this.http.get(`${this.url}/summarized?start=${now}&end=${beginningOfTheWeek}`).pipe(map(res => res as UsageSummary));
    }
}
