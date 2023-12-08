import { Component, Renderer2, RendererFactory2 } from '@angular/core';
import { Palette } from '../../models/palette';
import { StyleChangerService } from '../../services/style-service/style-changer.service';

@Component({
  selector: 'app-generate-palette-page',
  templateUrl: './generate-palette-page.component.html',
  styleUrl: './generate-palette-page.component.scss'
})
export class GeneratePalettePageComponent {


  
  
  constructor(
    private styleService: StyleChangerService
  ) { }

  palette: Palette = {
    id: undefined,
    name: "",
    private: true,
    modelType: "monochrome",
    creator: undefined,
    tags: [],
    colorInPalettes: []
  }

  test() {   
    this.styleService.recolor() 
  }  
}
