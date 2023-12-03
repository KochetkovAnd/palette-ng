import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginBlockComponent } from './components/login-block/login-block.component';
import { TestComponent } from './components/test/test.component';

const routes: Routes = [
  {path: "login", component: LoginBlockComponent},
  {path: "test", component: TestComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
