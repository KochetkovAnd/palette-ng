import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginBlockComponent } from './components/login-block/login-block.component';
import { PalettePageComponent } from './pages/palette-page/palette-page.component';
import { roleGuard } from './guards/role-guard/role.guard';
import { GeneratePalettePageComponent } from './pages/generate-palette-page/generate-palette-page.component';

const routes: Routes = [
  {
    path: "login",
    component: LoginBlockComponent
  },
  {
    path: "palettes",
    canActivate: [roleGuard],
    component: PalettePageComponent
  },
  {
    path: "generate_pallete",
    canActivate: [roleGuard],
    component: GeneratePalettePageComponent
  },
  {path: '**', redirectTo: '/login', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
