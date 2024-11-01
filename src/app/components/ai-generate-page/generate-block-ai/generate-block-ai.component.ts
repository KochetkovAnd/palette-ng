import { Component } from '@angular/core';
import { ColorInPalette } from '../../../models/colorInPalette';
import { Helper } from '../../../services/rgb-helper';

@Component({
  selector: 'generate-block-ai',
  templateUrl: './generate-block-ai.component.html',
  styleUrl: './generate-block-ai.component.scss'
})
export class GenerateBlockAiComponent {

  constructor(   
  ) {}

  colorsInPalette: ColorInPalette[]  = []
  closed: boolean[] = []

  refillColors(colors: ColorInPalette[]) {
    this.colorsInPalette = colors
  }

  getTextColorByHex(hex: string) {
    return Helper.getTextColorByHex(hex)
  }
}
