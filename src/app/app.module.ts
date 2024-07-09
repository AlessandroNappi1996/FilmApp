import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListaFilmComponent } from './lista-film/lista-film.component';
import { HttpClientModule } from '@angular/common/http';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FileUploadModule} from 'primeng/fileupload';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { MessageService } from 'primeng/api';
import {InputTextModule} from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {CalendarModule} from 'primeng/calendar';




@NgModule({

  declarations: [
    AppComponent,
    ListaFilmComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    DialogModule,
    ButtonModule,
    BrowserAnimationsModule,
    FileUploadModule,
    NgxDropzoneModule,
    InputTextModule,
    FormsModule,
    ReactiveFormsModule,
    CalendarModule

  ],
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
