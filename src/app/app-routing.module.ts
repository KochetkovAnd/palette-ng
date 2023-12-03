import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginBlockComponent } from './components/login-block/login-block.component';

const routes: Routes = [
  {path: "login", component: LoginBlockComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
