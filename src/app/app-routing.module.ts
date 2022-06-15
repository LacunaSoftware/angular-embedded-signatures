import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignerComponent } from './signer/signer.component';

const routes: Routes = [
  { path: '', component: SignerComponent},
  { path: 'home', redirectTo: '', component: SignerComponent}
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(
      routes,
      {
        // DEBUG
        // enableTracing: true, // <-- debugging purposes only
        onSameUrlNavigation: 'reload' // <-- enables refreshing
      }
    )
  ],
  exports: [ RouterModule ]
})

export class AppRoutingModule { }
