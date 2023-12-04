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

@NgModule({
  declarations: [
    AppComponent,
    LoginBlockComponent,
    PalettePageComponent,
    NavbarUserComponent,
    PaletteItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
