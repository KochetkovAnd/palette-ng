import { Component } from '@angular/core';
import { Palette } from '../../models/palette';

@Component({
  selector: 'app-generate-palette-page',
  templateUrl: './generate-palette-page.component.html',
  styleUrl: './generate-palette-page.component.scss'
})
export class GeneratePalettePageComponent {
  palette: Palette = {
    id: undefined,
    name: "",
    private: true,
    modelType: "monochrome",
    creator: undefined,
    tags: [],
    colorInPalettes: []
  }
}
