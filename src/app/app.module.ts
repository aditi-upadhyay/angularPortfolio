import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NewDesignComponent } from './components/new-design/new-design.component';
import { CareerComponent } from './components/career/career.component';
import { ContactComponent } from './components/contact/contact.component';
import { RecognitionComponent } from './components/recognition/recognition.component';
import { TechStackComponent } from './components/tech-stack/tech-stack.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AcademicComponent } from './components/academic/academic.component';

@NgModule({
  declarations: [
    AppComponent,
    NewDesignComponent,
    CareerComponent,
    ContactComponent,
    RecognitionComponent,
    TechStackComponent,
    AcademicComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { } 
