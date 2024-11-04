import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginBlockComponent } from './components/general/login-block/login-block.component';
import { PalettePageComponent } from './pages/palette-page/palette-page.component';
import { roleGuard } from './guards/role-guard/role.guard';
import { GeneratePalettePageComponent } from './pages/generate-palette-page/generate-palette-page.component';
import { GenerateWheelPalettePageComponent } from './pages/generate-wheel-palette-page/generate-wheel-palette-page.component';
import { GeneratePaletteAiPageComponent } from './pages/generate-palette-ai-page/generate-palette-ai-page.component';
import { PicturePalettePageComponent } from './pages/picture-palette-page/picture-palette-page.component';

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
    path: "generate_palette_ai",
    canActivate: [roleGuard],
    component: GeneratePaletteAiPageComponent
  },
  {
    path: "picture_palette",
    canActivate: [roleGuard],
    component: PicturePalettePageComponent
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
