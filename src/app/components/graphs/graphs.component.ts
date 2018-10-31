import { Component, OnInit, AfterViewInit } from "@angular/core";
import { Chart } from "chart.js";

@Component({
  selector: "app-graphs",
  templateUrl: "./graphs.component.html",
  styleUrls: ["./graphs.component.css"]
})
export class GraphsComponent implements OnInit {
  constructor() {}

  canvas: any;
  ctx: any;

  ngOnInit() {
    this.canvas = document.getElementById("myChart");
    this.ctx = this.canvas.getContext("2d");
    let myChart = new Chart(this.ctx, {
      type: "bar",
      data: {
        labels: ["New", "In Progress", "On Hold"],
        datasets: [
          {
            label: "# of Votes",
            data: [1, 2, 3],
            backgroundColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)"
            ],
            borderWidth: 1
          }
        ]
      },
      options: {
        responsive: true,
        display: true
      }
    });
  }
}
