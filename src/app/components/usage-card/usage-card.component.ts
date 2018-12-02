import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-usage-card',
  templateUrl: './usage-card.component.html',
  styleUrls: ['./usage-card.component.css']
})
export class UsageCardComponent implements OnInit {
  @Input() public valueName:string;
  @Input() public value:number;
  @Input() public icon:string;

  constructor() { }

  ngOnInit() {
  }

}
