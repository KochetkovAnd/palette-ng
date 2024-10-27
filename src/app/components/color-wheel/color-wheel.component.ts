import { CdkDrag, CdkDragDrop, CdkDragEnd, CdkDragMove, CdkDragStart, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, ElementRef, SimpleChanges, ViewChild, OnChanges, Input } from '@angular/core';
import { ColorInPalette } from '../../models/colorInPalette';
import { RGBColor } from '../../models/colors/rgbColor';
import { StyleChangerService } from '../../services/style-service/style-changer.service';
import { Palette } from '../../models/palette';
import { HttpService } from '../../services/http-service/http.service';
import { Tag } from '../../models/tag';
import { last, lastValueFrom } from 'rxjs';

function isColorDark(rgbcolor: RGBColor): boolean {
  const brightness = calculateBrightness(rgbcolor);
  return brightness < 100;
}
function calculateBrightness(rgbcolor: RGBColor): number {  
  return (rgbcolor.red * 299 + rgbcolor.green * 587 + rgbcolor.blue * 114) / 1000;
}

function HEXtoRGB(hex: string): RGBColor {
  const bigint = parseInt(hex, 16);
  const red = (bigint >> 16) & 255;
  const green = (bigint >> 8) & 255;
  const blue = bigint & 255;
  return { red, green, blue }
}


function RGBtoHEX(rgbColor: RGBColor): string {
  const hexR = rgbColor.red.toString(16).padStart(2, '0');
  const hexG = rgbColor.green.toString(16).padStart(2, '0');
  const hexB = rgbColor.blue.toString(16).padStart(2, '0');

  return `${hexR}${hexG}${hexB}`;
}


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
  
  constructor (
    private styleService: StyleChangerService
  ) {}

  getCardStyle(color: RGBColor) {
    return {
      'background-color': `rgb(${color.red},${color.green},${color.blue})`
    }
  }

  getTextColor(rgbcolor: RGBColor) {
    let color = isColorDark(rgbcolor) ? 'var(--light_text)' : 'var(--dark_text)'
    return { 'color': color }
  }

  getHEX(rgbColor : RGBColor) {
    return RGBtoHEX(rgbColor).toUpperCase()
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
