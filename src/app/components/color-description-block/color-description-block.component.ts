import { Component, Input } from '@angular/core';
import { RGBColor } from '../../models/colors/rgbColor';

@Component({
  selector: 'color-description-block',
  templateUrl: './color-description-block.component.html',
  styleUrl: './color-description-block.component.scss'
})
export class ColorDescriptionBlockComponent {
  @Input() colors:RGBColor[] = []
}
