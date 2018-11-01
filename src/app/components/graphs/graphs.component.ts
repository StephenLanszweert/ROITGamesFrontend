import { Graph } from "./../../classes/graph";
import { WaterwellService } from "./../../services/waterwell.service";
import { Component, OnInit } from "@angular/core";
import { Chart } from "chart.js";

@Component({
  selector: "app-graphs",
  templateUrl: "./graphs.component.html",
  styleUrls: ["./graphs.component.css"]
})
export class GraphsComponent implements OnInit {
  constructor(private waterWellService: WaterwellService) {}

  canvas: any;
  ctx: any;
  graphs: any;
  allPoints: any;

  ngOnInit() {
    // TODO: make class for the Graph
    this.graphs = [];
    this.waterWellService.getAll().subscribe(result => {
      this.allPoints = result;
      this.graphs.push(this.makeGraph("waterLeft", "line", this.allPoints));
      this.graphs.push(
        this.makeGraph("waterTemperature", "line", this.allPoints)
      );
      this.graphs.push(
        this.makeGraph("airTemperature", "line", this.allPoints)
      );
      console.log(this.graphs);
      console.log(this.graphs[0].data);
    });
    this.addSelectForTime();
  }

  addSelectForTime() {
    let elem = document.getElementsByTagName("li");
    for (let i = 0; i < elem.length; i++) {
      elem[i].addEventListener("click", e => this.selectAnotherTime(e));
    }
  }

  selectAnotherTime(e) {
    let timeSpan = e.target.getAttribute("data-time");
    let type = e.target.parentNode.getAttribute("data-type");
    this.updateGraph(type, timeSpan);
  }

  updateGraph(typeGraph, timeSpan) {
    let date = new Date();
    let start = new Date(date);
    let end = date;
    switch (timeSpan) {
      case "1y":
        end.setFullYear(start.getFullYear() - 1);
        break;
      case "all":
        // set start to nothing => all must be asked
        end = null;
        break;
      case "3m":
        end.setMonth(start.getMonth() - 3);
        break;
      case "1m":
        end.setMonth(start.getMonth() - 1);
        break;
      case "1w":
        end = this.getLastWeek();
        break;
      case "24h":
        console.log(start.getHours() - 12);
        break;
      default:
        // do nothing
        break;
    }
    console.log(typeGraph);
    this.waterWellService
      .getDataBetweenPeriods(start, end)
      .subscribe(result => {
        let labels = [];
        result.forEach(element => {
          labels.push(this.makeTime(element.timestamp));
        });
        this.updatePoints(typeGraph, result, labels);
      });
  }

  updatePoints(id, result, labels) {
    for (let i = 0; i < this.graphs.length; i++) {
      if (this.graphs[i].canvas.getAttribute("id") == id) {
        console.log("gevonden");
        this.removeData(this.graphs[i]);
        this.addData(this.graphs[i], labels, result);
        console.log(this.graphs[i]);
      }
    }
  }
  addData(chart, label, data) {
    chart.data.datasets.forEach(dataset => {
      dataset.data = data;
    });
    chart.data.labels = label;

    chart.update();
    console.log(chart.data);
  }
  removeData(chart) {
    chart.data.labels = [];
    chart.data.datasets.forEach(dataset => {
      dataset.data = [];
    });
    chart.update();
  }

  makeGraph(idElem, type, dataSet) {
    let points = [];
    let labels = [];
    let myChart = null;
    dataSet.forEach(element => {
      labels.push(this.makeTime(element.timestamp));
      points.push(element[idElem]);
    });
    this.canvas = document.getElementById(idElem);
    this.ctx = this.canvas.getContext("2d");
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    return (myChart = new Chart(this.ctx, {
      type: "line",
      data: {
        labels: labels,
        datasets: [
          {
            label: idElem,
            data: points,
            backgroundColor: ["rgb(6, 255, 234)"],
            borderWidth: 0.2
          }
        ]
      },
      options: {
        responsive: true,
        display: true,
        scales: {
          yAxes: [
            {
              scaleLabel: {
                display: true,
                labelString: "test"
              }
            }
          ]
        }
      }
    }));
  }

  makeTime(givenDate) {
    let date = new Date(givenDate);
    return (
      date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear()
    );
  }
  getLastWeek() {
    var today = new Date();
    var lastWeek = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() - 7
    );
    return lastWeek;
  }
}
