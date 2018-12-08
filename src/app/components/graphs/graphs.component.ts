import { Graph } from "./../../classes/graph";
import { WaterwellService } from "./../../services/waterwell.service";
import { Component, OnInit } from "@angular/core";
import { Chart } from "chart.js";
import * as dayjs from "dayjs";

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
    this.graphs = [];
    this.waterWellService.getAll().subscribe(result => {
      this.allPoints = result;
      this.graphs.push(this.makeGraph("waterLeft", "line", this.allPoints));
    });
    this.addSelectForTime();
    this.changeActiveState();
  }

  changeActiveState() {
    let lis: any = document.querySelectorAll("li");
    lis.forEach(li => {
      li.addEventListener("click", e => {
        lis.forEach(li => {
          li.classList.remove("active");
        });
        let chosen: HTMLBodyElement = e.target;
        e.target.classList.add("active");
      });
    });
  }

  addSelectForTime() {
    const elem = document.getElementsByTagName("li");
    for (let i = 0; i < elem.length; i++) {
      elem[i].addEventListener("click", e => this.selectAnotherTime(e));
    }
  }

  selectAnotherTime(e) {
    const timeSpan = e.target.getAttribute("data-time");
    const type = e.target.parentNode.getAttribute("data-type");
    this.updateGraph(type, timeSpan);
  }

  updateGraph(typeGraph, timeSpan) {
    const start = new Date();
    let end;
    switch (timeSpan) {
      case "1y":
        end = dayjs().subtract(1, "year");
        break;
      case "all":
        // set start to nothing => all must be asked
        end = null;
        break;
      case "3m":
        end = dayjs().subtract(3, "month");
        break;
      case "1m":
        end = dayjs().subtract(1, "month");
        break;
      case "1w":
        end = dayjs().subtract(1, "week");
        break;
      case "24h":
        end = dayjs().subtract(24, "hour");
        break;
      case "12h":
        end = dayjs().subtract(12, "hour");
        break;
      default:
        // do nothing
        break;
    }

    this.waterWellService
      .getDataBetweenPeriods(start, end)
      .subscribe(result => {
        const labels = [];

        result.forEach(element => {
          labels.push(this.makeTime(element.timestamp));
        });

        this.updatePoints(typeGraph, result, labels);
      });
  }

  updatePoints(id, result, labels) {
    for (let i = 0; i < this.graphs.length; i++) {
      if (this.graphs[i].canvas.getAttribute("id") === id) {
        this.removeData(this.graphs[i]);
        this.addData(this.graphs[i], id, labels, result);
      }
    }
  }

  addData(chart, type, labels, data) {
    const dataset = {
      label: type,
      data: data.map(entry => entry[type]),
      backgroundColor: ["rgb(6, 255, 234)"],
      borderWidth: 0.2,
      pointRadius: 0,
      pointHoverRadius: 1
    };
    chart.data.datasets[0] = dataset;
    chart.data.labels = labels;
    chart.update();
  }

  removeData(chart) {
    chart.data.labels = [];
    chart.data.datasets = [];
    chart.update();
  }

  makeGraph(idElem, type, dataSet) {
    const points = [];
    const labels = [];
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
            borderWidth: 0.2,
            pointRadius: 0,
            pointHoverRadius: 1
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
    const date = new Date(givenDate);
    return (
      date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear()
    );
  }
}
