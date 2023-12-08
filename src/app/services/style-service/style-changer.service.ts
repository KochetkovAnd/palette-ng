import { ElementRef, Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { ColorInPalette } from '../../models/colorInPalette';

@Injectable({
  providedIn: 'root'
})
export class StyleChangerService {


  default_light_shades = "FAFBF8"
  default_light_accent = "B5BCC2"
  default_main_brand_color = "9DA7B3"
  default_dark_accent = "6AB3EF"
  default_dark_shades = "386FD2"



  light_shades: string = this.default_light_shades
  light_accent: string = this.default_light_accent
  main_brand_color: string = this.default_main_brand_color
  dark_accent: string = this.default_dark_accent
  dark_shades: string = this.default_dark_shades

  setColors(colorInPalettes: ColorInPalette[]) {
    this.light_shades = colorInPalettes[0].hex
    this.light_accent = colorInPalettes[1].hex
    this.main_brand_color = colorInPalettes[2].hex
    this.dark_accent = colorInPalettes[3].hex
    this.dark_shades = colorInPalettes[4].hex
  }

  recolor() {
    this.updateGlobalVariable('light_shades', "#" + this.light_shades)
    this.updateGlobalVariable('light_accent', "#" + this.light_accent)
    this.updateGlobalVariable('main_brand_color', "#" + this.main_brand_color)
    this.updateGlobalVariable('dark_accent', "#" + this.dark_accent)
    this.updateGlobalVariable('dark_shades', "#" + this.dark_shades)
  }

  reset() {
    this.updateGlobalVariable('light_shades', "#" + this.default_light_shades)
    this.updateGlobalVariable('light_accent', "#" + this.default_light_accent)
    this.updateGlobalVariable('main_brand_color', "#" + this.default_main_brand_color)
    this.updateGlobalVariable('dark_accent', "#" + this.default_dark_accent)
    this.updateGlobalVariable('dark_shades', "#" + this.default_dark_shades)
  }

  updateGlobalVariable(name: string, value: string) {
    document.documentElement.style.setProperty(`--${name}`, value)
  }
}
