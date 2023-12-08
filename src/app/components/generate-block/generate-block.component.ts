import { Component, Input } from '@angular/core';
import { ColorInPalette } from '../../models/colorInPalette';
import { HttpService } from '../../services/http-service/http.service';
import { lastValueFrom } from 'rxjs';
import { StyleChangerService } from '../../services/style-service/style-changer.service';


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
  selector: 'generate-block',
  templateUrl: './generate-block.component.html',
  styleUrl: './generate-block.component.scss'
})
export class GenerateBlockComponent {

  constructor(
    private httpService: HttpService,
    private styleService: StyleChangerService
  ) {}

  @Input() modelType: string = "monochrome"
  @Input() colorsInPalette: ColorInPalette[]  = []
  closed: boolean[] = []
  colorSchemes: string[] = ['monochrome', 'sequential', 'complementary', 'split-complementary', 'triangular']

  async ngOnInit() {  
    this.styleService.reset()   
    this.colorsInPalette = await lastValueFrom(this.httpService.generate(this.colorsInPalette, this.modelType))       
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
    let color = isColorDark(hex) ? 'white' : 'black'
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
    this.colorsInPalette = await lastValueFrom(this.httpService.generate(this.colorsInPalette, this.modelType))  
    this.styleService.setColors(this.colorsInPalette) 
  }

  plus () {
    this.closed.push(false)
    this.colorsInPalette.push({
      hex: "FFFFFF",
      colorRole: ""
    })
  }

  minus () {
    this.closed.pop()
    this.colorsInPalette.pop()
  }

  onModelChange() {
    this.colorsInPalette = []
    this.ngOnInit()
  }

  buttonVisible() {
    return this.modelType == "monochrome"
  }
}
