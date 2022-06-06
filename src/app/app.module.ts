import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SignerComponent } from './signer/signer.component';

@NgModule({
  declarations: [
    AppComponent,
    SignerComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [SignerComponent]
})
export class AppModule { }
