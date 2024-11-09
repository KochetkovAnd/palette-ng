import { Component, EventEmitter, Input, Output } from '@angular/core';
import { HttpService } from '../../../services/http-service/http.service';
import { StyleChangerService } from '../../../services/style-service/style-changer.service';
import { ColorInPalette } from '../../../models/colorInPalette';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'horizontal-palette-bar',
  templateUrl: './horizontal-palette-bar.component.html',
  styleUrl: './horizontal-palette-bar.component.scss'
})
export class HorizontalPaletteBarComponent {

  constructor(
    private httpService: HttpService,
    private styleService: StyleChangerService
  ) {}

  @Input() colorsInPalette: ColorInPalette[] = []
  @Input() closed: boolean[] = []
  @Output() newColorsInPalette = new EventEmitter<ColorInPalette[]>()
  
  async regenerate() {
    for (let i = 0; i < this.closed.length; i++) {
      if (!this.closed[i]) {
        this.colorsInPalette[i].hex = ""
      }
    }
    this.newColorsInPalette.emit(await lastValueFrom(this.httpService.generate(this.colorsInPalette, "monochrome")))        
  }

  useSchema() {
    this.styleService.setColors(this.colorsInPalette)
    this.styleService.recolor() 
  }

  reset() {
    this.styleService.reset()
  }

  reverse() {
    this.swap(0,4)
    this.swap(1,3)
    this.newColorsInPalette.emit(this.colorsInPalette)
  }

  swap(first: number, second: number) {
    let c =  this.colorsInPalette[first]
    this.colorsInPalette[first] = this.colorsInPalette[second]
    this.colorsInPalette[second] = c
  }
}
