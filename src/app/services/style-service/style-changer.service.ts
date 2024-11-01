import { ElementRef, Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { ColorInPalette } from '../../models/colorInPalette';
import { Helper } from '../rgb-helper';

@Injectable({
  providedIn: 'root'
})

export class StyleChangerService {

  constructor() { }


  // Стандартные значения
  light_text_color = "FFFFFF"
  dark_text_color = "000000"

  default_light_shades = "ECEBED"
  default_light_accent = "5574C4"
  default_main_brand_color = "7777FC"  
  default_dark_accent = "191D21"
  default_dark_shades = "0C0C28"

  default_main_brand_color_hover = "6F6FED"
  default_light_shades_hover = "000000"
  default_dark_shades_hover = "0F0F33"

  // Текущие значения
  text_color = this.dark_text_color
  reverse_text_color = this.light_text_color

  light_shades = this.default_light_shades
  light_accent = this.default_light_shades
  main_brand_color = this.default_main_brand_color 
  dark_accent = this.default_dark_accent
  dark_shades = this.default_dark_shades

  main_brand_color_hover = this.default_main_brand_color_hover
  dark_shades_hover = this.default_dark_shades_hover
  light_shades_hover = this.default_light_shades_hover

  setColors(colorInPalettes: ColorInPalette[]) {

    this.light_shades = colorInPalettes[0].hex
    this.light_accent = colorInPalettes[1].hex
    this.main_brand_color = colorInPalettes[2].hex
    this.dark_accent = colorInPalettes[3].hex
    this.dark_shades = colorInPalettes[4].hex

    let light_shadesRGB = Helper.HEXtoRGB(colorInPalettes[0].hex)
    let main_colorRGB = Helper.HEXtoRGB(colorInPalettes[2].hex)
    let dark_shadesRGB = Helper.HEXtoRGB(colorInPalettes[4].hex)

    this.main_brand_color_hover = Helper.RGBtoHEX({
      red: Helper.clip(main_colorRGB.red - 5),
      green: Helper.clip(main_colorRGB.green - 5),
      blue: Helper.clip(main_colorRGB.blue - 5),
    })

    if (Helper.isColorDark(dark_shadesRGB)) {
      this.dark_shades_hover = Helper.RGBtoHEX({
        red: dark_shadesRGB.red + 10,
        green: dark_shadesRGB.green + 10,
        blue: dark_shadesRGB.blue + 10,
      })
      this.light_shades_hover = Helper.RGBtoHEX({
        red: light_shadesRGB.red - 10,
        green: light_shadesRGB.green - 10,
        blue: light_shadesRGB.blue - 10,
      })
    } else {
      this.dark_shades_hover = Helper.RGBtoHEX({
        red: dark_shadesRGB.red - 10,
        green: dark_shadesRGB.green - 10,
        blue: dark_shadesRGB.blue - 10,
      })
      this.light_shades_hover = Helper.RGBtoHEX({
        red: light_shadesRGB.red + 10,
        green: light_shadesRGB.green + 10,
        blue: light_shadesRGB.blue + 10,
      })
    }  
    
    if (Helper.isColorDark(dark_shadesRGB)) {
      this.reverse_text_color = this.light_text_color
    } else {
      this.reverse_text_color = this.dark_text_color
    }

    if (Helper.isColorDark(light_shadesRGB)) {
      this.text_color = this.light_text_color
    } else {
      this.text_color = this.dark_text_color
    }

  }

  recolor() {
    this.updateGlobalVariable('text_color', "#" + this.text_color)
    this.updateGlobalVariable('reverse_text_color', "#" + this.reverse_text_color)

    this.updateGlobalVariable('light_shades', "#" + this.light_shades)
    this.updateGlobalVariable('light_accent', "#" + this.light_accent)
    this.updateGlobalVariable('main_brand_color', "#" + this.main_brand_color)
    this.updateGlobalVariable('dark_accent', "#" + this.dark_accent)
    this.updateGlobalVariable('dark_shades', "#" + this.dark_shades)

    this.updateGlobalVariable('main_brand_color_hover', "#" + this.main_brand_color_hover)
    this.updateGlobalVariable('dark_shades_hover', "#" + this.dark_shades_hover)
    this.updateGlobalVariable('light_shades_hover', "#" + this.light_shades_hover)
  }

  reset() {
    this.text_color = this.dark_text_color
    this.reverse_text_color = this.light_text_color

    this.light_shades = this.default_light_shades
    this.light_accent = this.default_light_shades
    this.main_brand_color = this.default_main_brand_color 
    this.dark_accent = this.default_dark_accent
    this.dark_shades = this.default_dark_shades

    this.main_brand_color_hover = this.default_main_brand_color_hover
    this.dark_shades_hover = this.default_dark_shades_hover
    this.light_shades_hover = this.default_light_shades_hover
    this.recolor()
  }
  

  updateGlobalVariable(name: string, value: string) {
    document.documentElement.style.setProperty(`--${name}`, value)
  }
}
