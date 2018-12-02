import { Component, OnInit } from "@angular/core";
import { UsageSummary } from "../../models/usageSummary";
import { WaterwellService } from "../../services/waterwell.service";

@Component({
  selector: "app-usage-summary",
  templateUrl: "./usage-summary.component.html",
  styleUrls: ["./usage-summary.component.css"]
})
export class UsageSummaryComponent implements OnInit {
  public usageSummary: UsageSummary;

  constructor(private waterwellService: WaterwellService) {}

  ngOnInit() {
    this.waterwellService
      .getUsageSummaryThisWeek()
      .subscribe(gottenUsageSummary => {
        this.usageSummary = gottenUsageSummary;
      });
  }
}
