import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { CpfPipe } from './cpf.pipe';
import { SignerComponent } from './signer/signer.component';

@NgModule({
  declarations: [
    AppComponent,
    SignerComponent,
    CpfPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [SignerComponent]
})
export class AppModule { }
