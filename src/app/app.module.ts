import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { LoginBlockComponent } from './components/login-block/login-block.component';
import { PalettePageComponent } from './pages/palette-page/palette-page.component';
import { NavbarUserComponent } from './components/navbar-user/navbar-user.component';
import { PaletteItemComponent } from './components/palette-item/palette-item.component';
import { GeneratePalettePageComponent } from './pages/generate-palette-page/generate-palette-page.component';
import { GenerateBlockComponent } from './components/generate-block/generate-block.component';
import { StyleChangerService } from './services/style-service/style-changer.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginBlockComponent,
    PalettePageComponent,
    NavbarUserComponent,
    PaletteItemComponent,
    GeneratePalettePageComponent,
    GenerateBlockComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [StyleChangerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
