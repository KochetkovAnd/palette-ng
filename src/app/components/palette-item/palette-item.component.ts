import { Component, Input } from '@angular/core';
import { Palette } from '../../models/palette';
import { ColorInPalette } from '../../models/colorInPalette';

@Component({
  selector: 'palette-item',
  templateUrl: './palette-item.component.html',
  styleUrl: './palette-item.component.scss'
})
export class PaletteItemComponent {
  @Input() palette: Palette | undefined

  hoveredIndex: number | null = null

  getStyle(colorInPalette: ColorInPalette, index: number): {[key:string] : string } {
    
    let width = "20%"

    if (this.palette) {
      const baseWidth = 100 / this.palette.colorInPalettes.length
      if (this.hoveredIndex !== null) {
        if (this.hoveredIndex !== index) {
          width = `calc(${baseWidth}% - (100px / ${this.palette.colorInPalettes.length - 1}))`
        } else {
          width = `calc(${baseWidth}% + 100px)`
        }
      }  else {
        width = `${baseWidth}%`
      }    
    }
    
    
    
    return {
      'background-color': "#" + colorInPalette.hex,
      'width': width,
      'transition': 'width 0.3s ease-in-out'
      
    }
  }

  onMouseEnter(index:number): void {    
    this.hoveredIndex = index;    
  }

  onMouseLeave(): void {
    this.hoveredIndex = null;
  }


  getLastColor() {
    if (this.palette) {
      return {
        'background-color': "#" + this.palette?.colorInPalettes[this.palette.colorInPalettes.length - 1].hex,
      }
    }
    return {}    
  }

  isColorDark(color:string): boolean {
    const brightness = this.calculateBrightness(color);
    return brightness < 100;
  }

  private calculateBrightness(color: string): number {
    const rgb = this.HEXtoRGB(color);
    return (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;
  }

  private HEXtoRGB(hex:string): {r: number, g: number, b: number} {
    const bigint = parseInt(hex, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;    
    return { r, g, b };
  }

  getTextColor(hex: string) {    
    let color = this.isColorDark(hex) ? 'white' : 'black'
    return {'color': color}
  }
}
