import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { ColorInPalette } from '../../../models/colorInPalette';
import { StyleChangerService } from '../../../services/style-service/style-changer.service';
import { HttpService } from '../../../services/http-service/http.service';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'picture-palette-bar',
  templateUrl: './picture-palette-bar.component.html',
  styleUrl: './picture-palette-bar.component.scss'
})
export class PicturePaletteBarComponent {

  constructor(
    private styleService: StyleChangerService,
    private httpService: HttpService
  ) {}

  @Input() colors: string[] = []
  @Input() selectedFile: File | null = null;
  @Output() newColors = new EventEmitter<string[]>()

  ngOnChanges(changes: SimpleChanges) {
    if (changes['selectedFile'] && changes['selectedFile'].currentValue) {
      if (this.selectedFile != null) {
        this.generate(this.selectedFile)
      }      
    }
  }

  

  useSchema() {
    this.styleService.setColors(this.getColorInPalette())
    this.styleService.recolor() 
  }

  reset() {
    this.styleService.reset()
  }

  getColorInPalette():ColorInPalette[] {
    let colorsInPalette: ColorInPalette[] = []
    this.colors.forEach((color) => {
      colorsInPalette.push({
        hex: color,
        "colorRole": ""
      })
    })
    return colorsInPalette    
  }

  regenerate() {
    if (this.selectedFile != null) {
      this.generate(this.selectedFile)
    }
  }
  async generate(file : File) {  
    const formData = new FormData();
    formData.append('file', file, file.name);
    this.newColors.emit(await lastValueFrom(this.httpService.generateByPicture(formData)))
  }

  reverse() {
    this.swap(0,4)
    this.swap(1,3)
    this.newColors.emit(this.colors)
  }

  swap(first: number, second: number) {
    let c =  this.colors[first]
    this.colors[first] = this.colors[second]
    this.colors[second] = c
  }
}
