import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { AppNavbarComponent } from './app-navbar/app-navbar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FooterComponent } from './footer/footer.component';

import {TodoDataService} from './todo-data.service';


@NgModule({
  declarations: [
    AppComponent,
    AppNavbarComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgbModule.forRoot()
  ],
  providers: [TodoDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
