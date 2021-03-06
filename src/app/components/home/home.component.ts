import {Component, OnInit} from '@angular/core';
import {WaterwellService} from './../../services/waterwell.service';
import {Measurement} from '../../models/measurement';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    public latestMeasurement: Measurement;
    public latestAvailable: boolean;

    constructor(private waterwellService: WaterwellService) {
    }

    ngOnInit() {
        this.latestAvailable = false;
        this.waterwellService.getLastMeasurement().subscribe(measurement => {
            this.latestMeasurement = measurement;
            this.latestAvailable = true;
        });
    }

    makeTime() {
        const date = new Date(this.latestMeasurement.timestamp);
        return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
    }
}
