import { Component, Input } from '@angular/core';
import { HttpService } from '../../services/http-service/http.service';
import { StyleChangerService } from '../../services/style-service/style-changer.service';
import { ColorInPalette } from '../../models/colorInPalette';
import { lastValueFrom } from 'rxjs';

function isColorDark(color:string): boolean {
  const brightness = calculateBrightness(color);
  return brightness < 100;
}
function calculateBrightness(color: string): number {
  const rgb = HEXtoRGB(color);
  return (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;
}
function HEXtoRGB(hex:string): {r: number, g: number, b: number} {
  const bigint = parseInt(hex, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;    
  return { r, g, b };
}

@Component({
  selector: 'generate-block-simple',
  templateUrl: './generate-block-simple.component.html',
  styleUrl: './generate-block-simple.component.scss'
})
export class GenerateBlockSimpleComponent {
  constructor(
    private httpService: HttpService,
    private styleService: StyleChangerService
  ) {}

  @Input() colorsInPalette: ColorInPalette[]  = []
  closed: boolean[] = []

  async ngOnInit() {  
    this.styleService.reset()   
    this.colorsInPalette = await lastValueFrom(this.httpService.generate(this.colorsInPalette, "monochrome"))       
    this.styleService.setColors(this.colorsInPalette)   
    this.closed = []
    for (let i = 0; i < this.colorsInPalette.length; i++ ) {this.closed.push(false)}
  }

  getWidth() {
    return {
      'width': `calc(100% / ${this.colorsInPalette.length})`
    }
  } 

  getTextColor(hex: string) {    
    let color = isColorDark(hex) ? 'var(--light_text)' : 'var(--dark_text)'
    return {'color': color}
  }

  change(i: number) {
    this.closed[i] = !this.closed[i]
  }

  async regenerate(){
    this.styleService.reset()
    for (let i = 0; i < this.closed.length; i++) {
      if (!this.closed[i]) {
        this.colorsInPalette[i].hex = ""
      }
    }
    this.colorsInPalette = await lastValueFrom(this.httpService.generate(this.colorsInPalette, "monochrome"))  
    this.styleService.setColors(this.colorsInPalette) 
  }  
}
