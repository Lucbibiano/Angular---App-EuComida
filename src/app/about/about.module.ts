import { NgModule } from "@angular/core";
import { AboutComponent } from "./about.component";
import { RouterModule, Routes, Route } from '@angular/router';

const ROTAS: Routes = [
  {path: '', component: AboutComponent}  
];

@NgModule({
    declarations: [AboutComponent],
    imports: [RouterModule.forChild(ROTAS)]
})

export class AboutModule {
}
