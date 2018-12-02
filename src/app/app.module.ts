import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';

import {AppComponent} from './app.component';
import {HomeComponent} from './components/home/home.component';
import {GraphsComponent} from './components/graphs/graphs.component';
import {UsageSummaryComponent} from './components/usage-summary/usage-summary.component';
import {UsageCardComponent} from './components/usage-card/usage-card.component';

import {WaterwellService} from './services/waterwell.service';

@NgModule({
    declarations: [AppComponent, HomeComponent, GraphsComponent, UsageSummaryComponent, UsageCardComponent],
    imports: [BrowserModule, HttpClientModule],
    providers: [WaterwellService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
