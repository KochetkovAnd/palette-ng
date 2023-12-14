import { ElementRef, Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { ColorInPalette } from '../../models/colorInPalette';

@Injectable({
  providedIn: 'root'
})
export class StyleChangerService {


  default_light_shades = "FAFBF8"
  default_light_accent = "B5BCC2"
  default_main_brand_color = "7777FC"
  default_dark_accent = "191D21"
  default_dark_shades = "0C0C28"
  default_dark_shades_hover = "0F0F33"



  light_shades: string = this.default_light_shades
  light_accent: string = this.default_light_accent
  main_brand_color: string = this.default_main_brand_color
  dark_accent: string = this.default_dark_accent
  dark_shades: string = this.default_dark_shades
  dark_shades_hover: string = this.default_dark_shades_hover

  setColors(colorInPalettes: ColorInPalette[]) {
    this.light_shades = colorInPalettes[0].hex
    this.light_accent = colorInPalettes[1].hex
    this.main_brand_color = colorInPalettes[2].hex
    this.dark_accent = colorInPalettes[3].hex
    this.dark_shades = colorInPalettes[4].hex
    this.dark_shades_hover = colorInPalettes[5].hex
  }

  recolor() {
    this.updateGlobalVariable('light_shades', "#" + this.light_shades)
    this.updateGlobalVariable('light_accent', "#" + this.light_accent)
    this.updateGlobalVariable('main_brand_color', "#" + this.main_brand_color)
    this.updateGlobalVariable('dark_accent', "#" + this.dark_accent)
    this.updateGlobalVariable('dark_shades', "#" + this.dark_shades)
    this.updateGlobalVariable('dark_shades_hover', "#" + this.dark_shades_hover)
  }

  reset() {
    this.updateGlobalVariable('light_shades', "#" + this.default_light_shades)
    this.updateGlobalVariable('light_accent', "#" + this.default_light_accent)
    this.updateGlobalVariable('main_brand_color', "#" + this.default_main_brand_color)
    this.updateGlobalVariable('dark_accent', "#" + this.default_dark_accent)
    this.updateGlobalVariable('dark_shades', "#" + this.default_dark_shades)
    this.updateGlobalVariable('dark_shades_hover', "#" + this.default_dark_shades_hover)
  }

  updateGlobalVariable(name: string, value: string) {
    document.documentElement.style.setProperty(`--${name}`, value)
  }
}
