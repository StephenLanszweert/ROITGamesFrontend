import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { HomeComponent } from "./components/home/home.component";
import { GraphsComponent } from "./components/graphs/graphs.component";
import { WaterwellService } from "./services/waterwell.service";
import { HttpModule } from "@angular/http";
import { HttpClientModule } from "@angular/common/http";

@NgModule({
  declarations: [AppComponent, HomeComponent, GraphsComponent],
  imports: [BrowserModule, HttpModule, HttpClientModule],
  providers: [WaterwellService],
  bootstrap: [AppComponent]
})
export class AppModule {}
