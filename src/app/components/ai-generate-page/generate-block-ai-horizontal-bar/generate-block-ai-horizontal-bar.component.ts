import { Component, EventEmitter, Input, Output } from '@angular/core';
import { HttpService } from '../../../services/http-service/http.service';
import { StyleChangerService } from '../../../services/style-service/style-changer.service';
import { ColorInPalette } from '../../../models/colorInPalette';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'generate-block-ai-horizontal-bar',
  templateUrl: './generate-block-ai-horizontal-bar.component.html',
  styleUrl: './generate-block-ai-horizontal-bar.component.scss'
})
export class GenerateBlockAiHorizontalBarComponent {

  constructor(
    private httpService: HttpService,
    private styleService: StyleChangerService
  ) {}

  @Input() colorsInPalette: ColorInPalette[] = [] 
  @Output() newColorsInPalette = new EventEmitter<ColorInPalette[]>()


  async ngOnInit() {
    this.regenerate()
  }

  async regenerate() {    
    this.newColorsInPalette.emit(await lastValueFrom(this.httpService.generateByModel()))       
  }

  useSchema() {
    this.styleService.setColors(this.colorsInPalette)
    this.styleService.recolor() 
  }

  reset() {
    this.styleService.reset()
  }
}
