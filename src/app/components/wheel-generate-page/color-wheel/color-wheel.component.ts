import { CdkDrag, CdkDragDrop, CdkDragEnd, CdkDragMove, CdkDragStart, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, ElementRef, SimpleChanges, ViewChild, OnChanges, Input } from '@angular/core';
import { RGBColor } from '../../../models/colors/rgbColor';
import { Tag } from '../../../models/tag';
import { Helper } from '../../../services/rgb-helper';

@Component({
  selector: 'color-wheel',
  templateUrl: './color-wheel.component.html',
  styleUrl: './color-wheel.component.scss'
})
export class ColorWheelComponent  {
  @ViewChild('canvas', { static: true }) canvas!: ElementRef<HTMLCanvasElement>;

  private ctx: CanvasRenderingContext2D | null = null  

  modelType: string = "монохроматическая"
  
  rgbColors: RGBColor[] = []

  changeColors(colors:RGBColor[]) {
    this.rgbColors = colors
  }

  changeModelType(type: string) {
    this.modelType = type
  }
  
  constructor () {}

  getCardStyle(color: RGBColor) {
    return {
      'background-color': `rgb(${color.red},${color.green},${color.blue})`
    }
  }

  getTextColor(rgbcolor: RGBColor) {
    let color = Helper.isColorDark(rgbcolor) ? 'var(--reverse_text_color)' : 'var(--text_color)'
    return { 'color': color }
  }

  getHEX(rgbColor : RGBColor) {
    return Helper.RGBtoHEX(rgbColor).toUpperCase()
  }

  async ngOnInit() {     
    this.ctx = this.canvas.nativeElement.getContext('2d');
    if (this.ctx) {
      this.drawColorWheel()
    }
  }  
  
  drop(event: CdkDragDrop<Tag[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }
  drawColorWheel() {
    if (this.ctx) {
      const centerX = this.ctx.canvas.width / 2;
      const centerY = this.ctx.canvas.height / 2;
      const radius = Math.min(centerX, centerY);

      for (let angle = 0; angle < 1440; angle += 0.25) {
        const startAngle = (angle - 0.25) * (Math.PI / 180);
        const endAngle = angle * (Math.PI / 180);

        this.ctx.beginPath();
        this.ctx.moveTo(centerX, centerY);
        this.ctx.arc(centerX, centerY, radius, startAngle, endAngle);
        this.ctx.closePath();

        const gradient = this.ctx.createRadialGradient(
          centerX,
          centerY,
          0,
          centerX,
          centerY,
          radius
        );

        gradient.addColorStop(0, 'white');
        gradient.addColorStop(1, `hsl(${angle}, 100%, 50%)`);


        this.ctx.fillStyle = gradient;
        this.ctx.fill();
      }
    }
  }

  
}
