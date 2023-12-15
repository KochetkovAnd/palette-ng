import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginBlockComponent } from './components/login-block/login-block.component';
import { PalettePageComponent } from './pages/palette-page/palette-page.component';
import { roleGuard } from './guards/role-guard/role.guard';
import { GeneratePalettePageComponent } from './pages/generate-palette-page/generate-palette-page.component';
import { GenerateWheelPalettePageComponent } from './pages/generate-wheel-palette-page/generate-wheel-palette-page.component';

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
    path: "generate_palette",
    canActivate: [roleGuard],
    component: GeneratePalettePageComponent
  },
  {
    path: "generate_wheel_palette",
    canActivate: [roleGuard],
    component: GenerateWheelPalettePageComponent
  },
  {path: '**', redirectTo: '/login', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
