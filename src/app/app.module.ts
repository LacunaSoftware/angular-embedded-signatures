import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { CpfPipe } from './cpf.pipe';
import { SignerComponent } from './signer/signer.component';
import { AppRoutingModule } from './app-routing.module';

import { NgxMaskModule } from 'ngx-mask';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    NgxMaskModule.forRoot()
  ],
  declarations: [
    AppComponent,
    SignerComponent,
    CpfPipe
  ],
  exports: [],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
