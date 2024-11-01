import { Component, Input } from '@angular/core';
import { HttpService } from '../../../services/http-service/http.service';
import { ColorInPalette } from '../../../models/colorInPalette';
import { lastValueFrom } from 'rxjs';

import { Helper } from '../../../services/rgb-helper';


@Component({
  selector: 'generate-block-simple',
  templateUrl: './generate-block-simple.component.html',
  styleUrl: './generate-block-simple.component.scss'
})
export class GenerateBlockSimpleComponent {
  constructor(
    private httpService: HttpService
  ) {}

  colorsInPalette: ColorInPalette[]  = []
  closed: boolean[] = []

  async ngOnInit() {  
    this.colorsInPalette = await lastValueFrom(this.httpService.generate(this.colorsInPalette, "monochrome"))       
    this.closed = []
    for (let i = 0; i < this.colorsInPalette.length; i++ ) {this.closed.push(false)}
  }

  getWidth() {
    return {
      'width': `calc(100% / ${this.colorsInPalette.length})`
    }
  } 

  getTextColor(hex: string) {    
    return Helper.getTextColorByHex(hex)
  }

  change(i: number) {
    this.closed[i] = !this.closed[i]
  }

  refillColors(colors: ColorInPalette[]) {
    this.colorsInPalette = colors
  }
}
