import { Component, Input } from '@angular/core';
import { Helper } from '../../../services/rgb-helper';

@Component({
  selector: 'picture-color-block',
  templateUrl: './picture-color-block.component.html',
  styleUrl: './picture-color-block.component.scss'
})
export class PictureColorBlockComponent {
  @Input() colors: string[] = []

  getCardStyle(color: string) {
    return {
      'background-color': `#${color}`
    }
  }

  getTextColor(color: string) {
    return Helper.getTextColorByHex(color)
  }

}
