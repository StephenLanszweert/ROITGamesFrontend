/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { WavingWaterComponent } from './waving-water.component';

describe('WavingWaterComponent', () => {
  let component: WavingWaterComponent;
  let fixture: ComponentFixture<WavingWaterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WavingWaterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WavingWaterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
