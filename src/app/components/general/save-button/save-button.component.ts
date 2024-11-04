import { Component, Input } from '@angular/core';
import { Palette } from '../../../models/palette';
import { ColorInPalette } from '../../../models/colorInPalette';

@Component({
  selector: 'save-button',
  templateUrl: './save-button.component.html',
  styleUrl: './save-button.component.scss'
})
export class SaveButtonComponent {

  @Input() colorInPalettes: ColorInPalette[] = []
  palette: Palette = {    
    name: "",
    private: true,
    modelType: "монохроматическая",
    tags: [],
    colorInPalettes: []
  }
  isSave = false;

  openSave() {
    this.palette.colorInPalettes = this.colorInPalettes
    this.isSave = true
  }
  closeSave() {
    this.isSave = false
  }
}
