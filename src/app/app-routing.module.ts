import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignerComponent } from './signer/signer.component';

const routes: Routes = [
  { path: '', component: SignerComponent},
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(
      routes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  exports: [ RouterModule ]
})

export class AppRoutingModule { }
