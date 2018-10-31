import { Component, OnInit } from "@angular/core";
import { WaterwellService } from "./../../services/waterwell.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  private latestMeasurement: object;
  private latestAvailable: boolean;
  private details: boolean;
  constructor(private waterwellService: WaterwellService) {}

  ngOnInit() {
    this.latestAvailable = false;
    this.details = true;
    this.waterwellService.getLastMeasurement().subscribe(res => {
      this.latestMeasurement = res;
      this.latestAvailable = true;
    });
  }

  makeTime() {
    let date = new Date(this.latestMeasurement[0].timestamp);
    let day = date.getDay();
    let month = date.getMonth();
    return `${date.getDay()}/${date.getMonth()}/${date.getFullYear()}`;
  }

  toggleDetails() {
    this.details = !this.details;
  }
}
