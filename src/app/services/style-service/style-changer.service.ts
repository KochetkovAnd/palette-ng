import { ElementRef, Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { ColorInPalette } from '../../models/colorInPalette';
import { RGBColor } from '../../models/colors/rgbColor';

function HEXtoRGB(hex: string): RGBColor {
  const bigint = parseInt(hex, 16);
  const red = (bigint >> 16) & 255;
  const green = (bigint >> 8) & 255;
  const blue = bigint & 255;
  return { red, green, blue }
}


function RGBtoHEX(rgbColor: RGBColor): string {
  const hexR = rgbColor.red.toString(16).padStart(2, '0');
  const hexG = rgbColor.green.toString(16).padStart(2, '0');
  const hexB = rgbColor.blue.toString(16).padStart(2, '0');

  return `${hexR}${hexG}${hexB}`;
}

@Injectable({
  providedIn: 'root'
})

export class StyleChangerService {


  default_light_shades = "ECEBED"
  default_light_accent = "5574C4"
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
    let dark_shadesRGB = HEXtoRGB(colorInPalettes[4].hex)

    this.light_shades = colorInPalettes[0].hex
    this.light_accent = colorInPalettes[1].hex
    this.main_brand_color = colorInPalettes[2].hex
    this.dark_accent = colorInPalettes[3].hex
    this.dark_shades = colorInPalettes[4].hex
    
    this.dark_shades_hover = RGBtoHEX({
      red: dark_shadesRGB.red + 10,
      green: dark_shadesRGB.green + 10,
      blue: dark_shadesRGB.blue + 10,
    })
    
    
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
