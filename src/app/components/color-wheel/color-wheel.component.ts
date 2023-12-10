import { CdkDrag, CdkDragDrop, CdkDragEnd, CdkDragMove, CdkDragStart } from '@angular/cdk/drag-drop';
import { Component, ElementRef, SimpleChanges, ViewChild, OnChanges, Input } from '@angular/core';
import { ColorInPalette } from '../../models/colorInPalette';
import { WheelColorsService } from '../../services/wheel-colors-service/wheel-colors.service';
import { RGBColor } from '../../models/colors/rgbColor';

function isColorDark(color: string): boolean {
  const brightness = calculateBrightness(color);
  return brightness < 100;
}
function calculateBrightness(color: string): number {
  const rgb = HEXtoRGB(color);
  return (rgb.red * 299 + rgb.green * 587 + rgb.blue * 114) / 1000;
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

  colorsInPalette: ColorInPalette[] = []  
  isActive = true

  getRed(i: number ) {
    return parseInt(this.colorsInPalette[i].hex.substring(0,2), 16)
  }

  getGreen(i: number ) {
    return parseInt(this.colorsInPalette[i].hex.substring(2,4), 16)
  }

  getBlue(i: number ) {
    return parseInt(this.colorsInPalette[i].hex.substring(4,6), 16)
  }

  constructor(
    private wheelColorsService: WheelColorsService
  ) { }

  getCardStyle(colorInPalette: ColorInPalette) {
    return {
      'background-color': '#' + colorInPalette.hex
    }
  }

  getTextColor(hex: string) {
    let color = isColorDark(hex) ? 'var(--light_text)' : 'var(--dark_text)'
    return { 'color': color }
  }

  ngOnInit() {   
    
    this.colorsInPalette = [
      { hex: "CC29CC", colorRole: "" },
      { hex: "993D99", colorRole: "" },
      { hex: "FF00FF", colorRole: "" },
      { hex: "663D66", colorRole: "" },
      { hex: "332933", colorRole: "" },
    ]
    
    this.ctx = this.canvas.nativeElement.getContext('2d');
    if (this.ctx) {
      this.drawColorWheel()
    }
  }

  test() {
    console.log(this.colorsInPalette[0].hex)
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
