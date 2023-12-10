import { Injectable } from '@angular/core';
import { ColorInPalette } from '../../models/colorInPalette';

@Injectable({
  providedIn: 'root'
})
export class WheelColorsService {

  colorsInPalette: ColorInPalette[]  = [
    {hex: "CC29CC", colorRole : ""},
    {hex: "993D99", colorRole : ""},
    {hex: "FF00FF", colorRole : ""},
    {hex: "663D66", colorRole : ""},
    {hex: "332933", colorRole : ""},
  ]
  
  get() {
    return this.colorsInPalette
  }

  update(index: number, hex: string) {
    this.colorsInPalette[index].hex = hex
  }

  
}
