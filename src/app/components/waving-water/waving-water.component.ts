import { Component, OnInit, Input } from "@angular/core";
import { Spring } from "./Spring";

@Component({
  selector: "app-waving-water",
  templateUrl: "./waving-water.component.html",
  styleUrls: ["./waving-water.component.css"]
})
export class WavingWaterComponent implements OnInit {
  public canvasWidth: number;
  public canvasHeight: number;

  private canvas: any;
  private ctx;

  private springs: Array<Spring>;
  private MAX_SPRINGS;
  private renderWavesEnabled: boolean;

  private waterHeight: number;
  private waterLeftPercentage: number;

  @Input()   
  set waterLeft(waterLeftPercentageGotten: number) {
    //This is needed because on input the canvas is not ready yet
    //We need to save it, when canvas is ready we call setWaterLevel again with the correct value
    this.waterLeftPercentage = waterLeftPercentageGotten;
    this.setWaterLevel(this.waterLeftPercentage);
  };

  constructor() {//
    this.MAX_SPRINGS = 250;
    this.renderWavesEnabled = true;
    this.springs = [];
  }

  ngOnInit() {
    this.canvasWidth = window.innerWidth;
    this.canvasHeight = window.innerHeight;

    this.canvas = document.querySelector("#waterCanvas");
    this.ctx = this.canvas.getContext("2d");
    this.ctx.fillStyle = "#247b95";

    for (var i = 0; i < this.MAX_SPRINGS; i++) {
      this.springs[i] = new Spring();
    }

    window.addEventListener("resize", () => {
      this.canvasWidth = window.innerWidth;
      this.canvasHeight = window.innerHeight;
    });

    this.setWaterLevel(this.waterLeftPercentage);
    this.tick();
  }

  updateSprings(spread) {
    var i;
    for (i = 0; i < this.MAX_SPRINGS; i++) {
      this.springs[i].update(0.02, 0.1);
    }

    var leftDeltas = [],
      rightDeltas = [];

    for (var t = 0; t < 8; t++) {
      for (i = 0; i < this.MAX_SPRINGS; i++) {
        if (i > 0) {
          leftDeltas[i] = spread * (this.springs[i].p - this.springs[i - 1].p);
          this.springs[i - 1].v += leftDeltas[i];
        }
        if (i < this.MAX_SPRINGS - 1) {
          rightDeltas[i] = spread * (this.springs[i].p - this.springs[i + 1].p);
          this.springs[i + 1].v += rightDeltas[i];
        }
      }

      for (i = 0; i < this.MAX_SPRINGS; i++) {
        if (i > 0) this.springs[i - 1].p += leftDeltas[i];
        if (i < this.MAX_SPRINGS - 1) this.springs[i + 1].p += rightDeltas[i];
      }
    }
  }

  renderWaves() {
    var i;
    this.ctx.beginPath();
    this.ctx.moveTo(0, this.canvasHeight);
    for (i = 0; i < this.MAX_SPRINGS; i++) {
      this.ctx.lineTo(
        i * (this.canvasWidth / this.MAX_SPRINGS),
        this.canvasHeight - this.waterHeight + this.springs[i].p
      );
    }
    this.ctx.lineTo(this.canvasWidth, this.canvasHeight);
    this.ctx.fillStyle = "rgb(130, 205, 241)";
    this.ctx.fill();
  }

  tick() {
    if (Math.random() > 0.95)
      this.springs[Math.floor(Math.random() * this.MAX_SPRINGS)].p = 150;

    this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);

    if (this.renderWavesEnabled) {
      this.updateSprings(0.2);
      this.renderWaves();
    }
    requestAnimationFrame(this.tick.bind(this));
  }

  depthPercentage2Height(depthPercentage) {
    this.renderWavesEnabled = !(depthPercentage <= 0);
    
    return this.canvasHeight * (depthPercentage / 100);
  }

  setWaterLevel(percentage) {
    this.waterHeight = this.depthPercentage2Height(percentage);
  }
}
