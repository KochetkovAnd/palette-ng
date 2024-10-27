import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RGBColor } from '../../../models/colors/rgbColor';
import { ColorInPalette } from '../../../models/colorInPalette';
import { StyleChangerService } from '../../../services/style-service/style-changer.service';

function RGBtoHEX(rgbColor: RGBColor): string {
  const hexR = rgbColor.red.toString(16).padStart(2, '0');
  const hexG = rgbColor.green.toString(16).padStart(2, '0');
  const hexB = rgbColor.blue.toString(16).padStart(2, '0');

  return `${hexR}${hexG}${hexB}`;
}

@Component({
  selector: 'vertical-palette-bar',
  templateUrl: './vertical-palette-bar.component.html',
  styleUrl: './vertical-palette-bar.component.scss'
})
export class VerticalPaletteBarComponent {

  defaultColors: Record<string, RGBColor[]> = {
    'монохроматическая': [
      { red: 204, green: 82, blue: 82 },
      { red: 255, green: 51, blue: 51 },
      { red: 255, green: 0, blue: 0 },
      { red: 204, green: 102, blue: 102 },
      { red: 51, green: 31, blue: 31 }
    ],
    'последовательная': [
      { red: 46, green: 230, blue: 61 },
      { red: 46, green: 230, blue: 138 },
      { red: 46, green: 230, blue: 214 },
      { red: 46, green: 168, blue: 230 },
      { red: 46, green: 92, blue: 230 }
    ],
    'комплиментарная' : [
      { red: 0, green: 250, blue: 250 },
      { red: 55, green: 166, blue: 166 },
      { red: 250, green: 0, blue: 0 },
      { red: 186, green: 47, blue: 47 },
      { red: 122, green: 61, blue: 61 }
    ],
    'сплит-комплиментарная': [
      { red: 0, green: 250, blue: 125 },
      { red: 0, green: 125, blue: 250 },
      { red: 61, green: 92, blue: 122 },
      { red: 250, green: 0, blue: 0 },
      { red: 122, green: 61, blue: 61 }
    ]
  }

  constructor(
    private styleService: StyleChangerService
  ) {}

  
  @Input() rgbColors: RGBColor[] = [];   
  @Input() modelType: string = "монохроматическая"

  @Output() onChangeEvent = new EventEmitter<RGBColor[]>()
  @Output() onChangeModelEvent = new EventEmitter<string>()
  colorSchemes: string[] = ['монохроматическая', 'последовательная', 'комплиментарная', 'сплит-комплиментарная']

  ngOnInit() {
    this.onChangeEvent.emit(this.defaultColors[this.modelType])
    this.onChangeModelEvent.emit(this.modelType)
  }

  onModelChange() {
    this.onChangeEvent.emit(this.defaultColors[this.modelType])
    this.onChangeModelEvent.emit(this.modelType)
  }

  useSchema() {
    this.styleService.setColors(this.getColorInPalette())
    this.styleService.recolor() 
  }

  reset() {
    this.styleService.reset()
  }

  getColorInPalette() {
    let colorsInPalette: ColorInPalette[] = []
    if (this.modelType == "монохроматическая") {
      colorsInPalette.push({
        hex: RGBtoHEX(this.rgbColors[3]),
        colorRole: ""
      })
      colorsInPalette.push({
        hex: RGBtoHEX(this.rgbColors[1]),
        colorRole: ""
      })
      colorsInPalette.push({
        hex: RGBtoHEX(this.rgbColors[2]),
        colorRole: ""
      })
      colorsInPalette.push({
        hex: RGBtoHEX(this.rgbColors[0]),
        colorRole: ""
      })
      colorsInPalette.push({
        hex: RGBtoHEX(this.rgbColors[4]),
        colorRole: ""
      })      
    } else {
      this.rgbColors.forEach(color => {
        colorsInPalette.push({
          hex: RGBtoHEX(color),
          colorRole: ""
        })
      })      
    }
  
    return colorsInPalette
  }
}
