import { WaterwellService } from "./../services/waterwell.service";
import { Chart } from "chart.js";
export class Graph {
  private chart: any;
  private points: any;
  private labels: any;
  private canvas: any;
  private ctx: any;
  constructor(
    idElem,
    type,
    initData,
    private waterwellService: WaterwellService
  ) {
    this.waterwellService
      .getLastMeasurement()
      .subscribe(res => console.log(res));
    /* this.points = [];
    this.labels = [];
    initData.forEach(element => {
      this.labels.push(this.makeTime(element.timestamp));
      this.points.push(element[idElem]);
    });
    this.canvas = document.getElementById(idElem);
    this.ctx = this.canvas.getContext("2d");
    let myChart = new Chart(this.ctx, {
      type: "line",
      data: {
        labels: this.labels,
        datasets: [
          {
            label: idElem,
            data: this.points,
            backgroundColor: ["rgb(6, 255, 234)"],
            borderWidth: 0.2
          }
        ]
      },
      options: {
        responsive: true,
        display: true
      }
    }); */
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
