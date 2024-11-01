import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DragDropModule } from '@angular/cdk/drag-drop';


import { AppComponent } from './app.component';
import { LoginBlockComponent } from './components/general/login-block/login-block.component';
import { PalettePageComponent } from './pages/palette-page/palette-page.component';
import { PaletteItemComponent } from './components/palette-page/palette-item/palette-item.component';
import { GeneratePalettePageComponent } from './pages/generate-palette-page/generate-palette-page.component';
import { GenerateBlockComponent } from './components/generate-block/generate-block.component';
import { StyleChangerService } from './services/style-service/style-changer.service';
import { GenerateBlockSimpleComponent } from './components/simple-generate-page/generate-block-simple/generate-block-simple.component';
import { ColorWheelComponent } from './components/wheel-generate-page/color-wheel/color-wheel.component';

import { ColorDescriptionBlockComponent } from './components/color-description-block/color-description-block.component';
import { GenerateWheelPalettePageComponent } from './pages/generate-wheel-palette-page/generate-wheel-palette-page.component';
import { SaveBlockComponent } from './components/general/save-block/save-block.component';
import { SaveButtonComponent } from './components/save-button/save-button.component';
import { HorizontalPaletteBarComponent } from './components/simple-generate-page/horizontal-palette-bar/horizontal-palette-bar.component';
import { VerticalPaletteBarComponent } from './components/wheel-generate-page/vertical-palette-bar/vertical-palette-bar.component';
import { NavbarUserComponent } from './components/general/navbar-user/navbar-user.component';
import { GeneratePaletteAiPageComponent } from './pages/generate-palette-ai-page/generate-palette-ai-page.component';
import { GenerateBlockAiComponent } from './components/ai-generate-page/generate-block-ai/generate-block-ai.component';
import { GenerateBlockAiHorizontalBarComponent } from './components/ai-generate-page/generate-block-ai-horizontal-bar/generate-block-ai-horizontal-bar.component';
import { ColorCircleComponent } from './components/wheel-generate-page/color-circle/color-circle.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginBlockComponent,
    PalettePageComponent,
    NavbarUserComponent,
    PaletteItemComponent,
    GeneratePalettePageComponent,
    GenerateBlockComponent,
    GenerateBlockSimpleComponent,
    ColorWheelComponent,
    ColorCircleComponent,
    ColorDescriptionBlockComponent,
    GenerateWheelPalettePageComponent,
    SaveBlockComponent,
    SaveButtonComponent,
    HorizontalPaletteBarComponent,
    VerticalPaletteBarComponent,
    GeneratePaletteAiPageComponent,
    GenerateBlockAiComponent,
    GenerateBlockAiHorizontalBarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    DragDropModule
  ],
  providers: [StyleChangerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
